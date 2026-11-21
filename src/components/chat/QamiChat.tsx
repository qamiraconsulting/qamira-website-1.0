import { Fragment, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUp, RotateCcw, X } from "lucide-react";
import clsx from "clsx";
import { useQamiChat } from "@/lib/qamiChat";

/** Qami's round face, from the mascot sheet. */
export const QAMI_AVATAR = "/qami/qami-avatar.webp";

const STARTERS = [
  "What do you do?",
  "I need a new website",
  "Help me automate my admin",
  "I'd like to talk to a person",
];

const SITE = /^https?:\/\/(www\.)?qamiraconsulting\.com/i;

/** Plain text with full URLs turned into links: our own pages open in-app, WhatsApp in a new tab. */
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+[^\s).,!?;:])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) return <Fragment key={i}>{part}</Fragment>;
        if (SITE.test(part)) {
          const path = part.replace(SITE, "") || "/";
          return (
            <Link key={i} to={path} className="font-medium text-brass-ink underline underline-offset-2">
              {path === "/" ? "qamiraconsulting.com" : path}
            </Link>
          );
        }
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noreferrer"
            data-contact-location="Qami"
            className="font-medium text-brass-ink underline underline-offset-2"
          >
            {part.replace(/^https?:\/\//, "")}
          </a>
        );
      })}
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: ReactNode }) {
  return (
    <div className={clsx("flex items-end gap-2", role === "user" && "justify-end")}>
      {role === "assistant" && <img src={QAMI_AVATAR} alt="" className="h-7 w-7 shrink-0 rounded-full ring-1 ring-charcoal/10" />}
      <div
        className={clsx(
          "max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
          role === "user" ? "rounded-br-md bg-navy text-white" : "rounded-bl-md bg-parchment text-charcoal",
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function QamiChat({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  const { messages, send, sending, error, unavailable, reset, ready } = useQamiChat(true);
  const [draft, setDraft] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (!draft.trim()) return;
    void send(draft);
    setDraft("");
  };

  const onlyGreeting = messages.length <= 1;

  return (
    <div className="flex h-[min(34rem,calc(100svh-7rem))] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-charcoal/10 px-3 py-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to contact options"
          className="rounded-full p-1.5 text-charcoal-dim transition-colors hover:bg-parchment hover:text-charcoal"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <img src={QAMI_AVATAR} alt="" className="h-9 w-9 rounded-full ring-1 ring-charcoal/10" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-charcoal">Qami</p>
          <p className="truncate text-[11px] text-charcoal-dim">AI assistant · answers any time</p>
        </div>
        <button
          type="button"
          onClick={() => void reset()}
          aria-label="Start a new chat"
          title="Start a new chat"
          className="rounded-full p-1.5 text-charcoal-dim transition-colors hover:bg-parchment hover:text-charcoal"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded-full p-1.5 text-charcoal-dim transition-colors hover:bg-parchment hover:text-charcoal"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3 py-4" aria-live="polite">
        {!ready && !unavailable && !error && (
          <div className="flex items-center gap-2 text-xs text-charcoal-dim">
            <img src={QAMI_AVATAR} alt="" className="h-7 w-7 animate-pulse rounded-full" />
            Qami is getting ready…
          </div>
        )}
        {unavailable && (
          <p className="rounded-lg bg-parchment p-3 text-xs leading-relaxed text-charcoal-dim">
            Qami isn't available right now. Please use WhatsApp, call or email us instead, and our team will help.
          </p>
        )}
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role}>
            {m.role === "assistant" ? <Linkified text={m.content} /> : m.content}
          </Bubble>
        ))}
        {sending && (
          <div className="flex items-end gap-2" aria-label="Qami is typing">
            <img src={QAMI_AVATAR} alt="" className="h-7 w-7 rounded-full ring-1 ring-charcoal/10" />
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-parchment px-3.5 py-3">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-charcoal-dim/60"
                  style={{ animationDelay: `${d * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
        {ready && onlyGreeting && !sending && (
          <div className="flex flex-wrap gap-1.5 pl-9">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="rounded-full border border-brass-logo/50 bg-white px-3 py-1.5 text-xs text-charcoal transition-colors hover:border-brass-logo hover:bg-parchment"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {error && <p className="text-xs text-red-700">{error}</p>}
      </div>

      {/* Input */}
      <form onSubmit={submit} className="border-t border-charcoal/10 p-2.5">
        <div className="flex items-end gap-2 rounded-xl border border-charcoal/15 bg-white px-3 py-2 focus-within:border-brass-logo">
          <textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) submit(e);
            }}
            rows={1}
            maxLength={2000}
            placeholder="Ask Qami anything…"
            aria-label="Message Qami"
            disabled={unavailable}
            className="max-h-28 min-h-[1.5rem] flex-1 resize-none bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal-dim"
          />
          <button
            type="submit"
            disabled={!draft.trim() || sending || unavailable}
            aria-label="Send"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-opacity disabled:opacity-30"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <p className="mt-1.5 px-1 text-[10.5px] leading-snug text-charcoal-dim">
          Qami is an AI assistant and can make mistakes. Chats are stored to help our team follow up. See our{" "}
          <Link to="/privacy" className="underline underline-offset-2">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
