import { useSyncExternalStore } from "react";
import { catalogue } from "@/data/content/serviceCatalogue";

// The visitor's service shortlist from /services, carried to /contact.
// Kept in localStorage so it survives a detour to a "How it works" page and
// back. It lives only in the visitor's browser; it reaches us only when they
// send the contact form. Every read and write is guarded because storage can
// be blocked (private windows, strict privacy settings), and the shortlist
// then simply lasts for the page view.

const STORAGE_KEY = "qamira:shortlist";
const EMPTY: string[] = [];
const knownCodes = new Set(catalogue.map((s) => s.code));

let codes: string[] = readStored();
const listeners = new Set<() => void>();

function readStored(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((c): c is string => typeof c === "string" && knownCodes.has(c)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function commit(next: string[]) {
  codes = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked -- the in-memory list still works for this visit.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keeps two open tabs in step.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      codes = readStored();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useShortlist() {
  const list = useSyncExternalStore(
    subscribe,
    () => codes,
    () => EMPTY,
  );
  return {
    codes: list,
    has: (code: string) => list.includes(code),
    toggle: (code: string) => commit(list.includes(code) ? list.filter((c) => c !== code) : [...list, code]),
    remove: (code: string) => commit(list.filter((c) => c !== code)),
    clear: () => commit(EMPTY),
  };
}
