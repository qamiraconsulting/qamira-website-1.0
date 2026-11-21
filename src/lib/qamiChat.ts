import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/metaPixel";
import { trackGoogleLead, trackQami } from "@/lib/googleTag";

// The visitor's chat with Qami. The conversation id is kept in this browser
// (localStorage) so the chat survives page changes and reloads; the
// transcript itself lives on the server (api/chat/*).

export type QamiMessage = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "qamira:qami-conversation";

function readId(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function writeId(id: string | null): void {
  try {
    if (id) window.localStorage.setItem(STORAGE_KEY, id);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // storage blocked: the chat still works for this page
  }
}

export function useQamiChat(active: boolean) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<QamiMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const loading = useRef(false);

  const start = useCallback(async () => {
    const res = await fetch("/api/chat/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    });
    const data = (await res.json().catch(() => ({}))) as { conversationId?: string; greeting?: string; unavailable?: boolean };
    if (!res.ok || !data.conversationId) {
      if (data.unavailable) setUnavailable(true);
      throw new Error("start failed");
    }
    writeId(data.conversationId);
    setConversationId(data.conversationId);
    setMessages([{ role: "assistant", content: data.greeting ?? "" }]);
    trackQami("qami_chat_start");
    return data.conversationId;
  }, []);

  // When the chat is opened: pick up an earlier conversation, or start one.
  useEffect(() => {
    if (!active || conversationId || loading.current) return;
    loading.current = true;
    (async () => {
      const saved = readId();
      if (saved) {
        const res = await fetch(`/api/chat/session?id=${encodeURIComponent(saved)}`);
        if (res.ok) {
          const data = (await res.json()) as { messages: QamiMessage[] };
          setConversationId(saved);
          setMessages(data.messages);
          return;
        }
        writeId(null);
      }
      await start();
    })()
      .catch(() => setError("Qami couldn't start just now. Please try again in a moment."))
      .finally(() => {
        loading.current = false;
      });
  }, [active, conversationId, start]);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || sending) return;
      setError(null);
      setSending(true);
      setMessages((m) => [...m, { role: "user", content: message }]);
      trackQami("qami_message");
      try {
        let id = conversationId ?? (await start());
        let res = await fetch("/api/chat/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversationId: id, message, page: window.location.pathname }),
        });
        let data = (await res.json().catch(() => ({}))) as { reply?: string; leadSaved?: boolean; error?: string; expired?: boolean };
        if (res.status === 404 && data.expired) {
          // The old chat is gone: start a fresh one and resend.
          id = await start();
          setMessages((m) => [...m, { role: "user", content: message }]);
          res = await fetch("/api/chat/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ conversationId: id, message, page: window.location.pathname }),
          });
          data = (await res.json().catch(() => ({}))) as typeof data;
        }
        if (!res.ok || !data.reply) {
          setError(data.error ?? "That message didn't send. Please try again.");
          return;
        }
        setMessages((m) => [...m, { role: "assistant", content: data.reply as string }]);
        if (data.leadSaved) {
          track("Lead", { content_name: "Qami chat" });
          trackGoogleLead("Qami chat");
        }
      } catch {
        setError("That message didn't send. Please check your connection and try again.");
      } finally {
        setSending(false);
      }
    },
    [conversationId, sending, start],
  );

  /** Clear this browser's chat and start again. */
  const reset = useCallback(async () => {
    writeId(null);
    setConversationId(null);
    setMessages([]);
    setError(null);
  }, []);

  return { messages, send, sending, error, unavailable, reset, ready: Boolean(conversationId) };
}
