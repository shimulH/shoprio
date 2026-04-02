"use client";

import { useEffect, useRef, useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import { cn } from "@buildd/utils";
import { Conversation, Platform } from "@/types/inbox";
import { Button } from "@/components/ui/button";

const platformColors: Record<Platform, string> = {
  facebook: "bg-blue-600",
  whatsapp: "bg-green-500",
  tiktok: "bg-slate-900",
  instagram: "bg-pink-600",
  messenger: "bg-blue-500",
};

const platformNames: Record<Platform, string> = {
  facebook: "Facebook",
  whatsapp: "WhatsApp",
  tiktok: "TikTok",
  instagram: "Instagram",
  messenger: "Messenger",
};

type ChatMessagesProps = {
  conversation: Conversation;
  onSendMessage: (text: string) => void;
};

export function ChatMessages({
  conversation,
  onSendMessage,
}: ChatMessagesProps) {
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages]);

  function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setDraft("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const platformColor = platformColors[conversation.platform];
  const platformName = platformNames[conversation.platform];

  return (
    <div className="flex h-full flex-1 flex-col bg-slate-50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-5 py-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
          {conversation.customer
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {conversation.customer}
          </p>
          <div className="flex items-center gap-1.5">
            <span className={cn("size-2 rounded-full", platformColor)} />
            <span className="text-xs text-slate-500">{platformName}</span>
          </div>
        </div>
      </div>

      {/* Live product preview */}
      {conversation.liveProduct && (
        <div className="border-b border-slate-200 bg-white px-5 py-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Live Product
          </p>
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {conversation.liveProduct.title}
              </p>
              <p className="text-xs text-slate-500">
                {conversation.liveProduct.price} · SKU:{" "}
                {conversation.liveProduct.sku}
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              {conversation.liveProduct.variants.slice(0, 3).map((v) => (
                <span
                  key={v}
                  className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {v}
                </span>
              ))}
              {conversation.liveProduct.variants.length > 3 && (
                <span className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                  +{conversation.liveProduct.variants.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {conversation.messages.map((msg) => {
          const isAgent = msg.sender === "agent";
          return (
            <div
              key={msg.id}
              className={cn(
                "flex gap-2",
                isAgent ? "justify-end" : "justify-start",
              )}
            >
              {!isAgent && (
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-300 text-[11px] font-semibold text-slate-700">
                  {conversation.customer[0].toUpperCase()}
                </div>
              )}
              <div
                className={cn(
                  "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
                  isAgent
                    ? "rounded-tr-sm bg-blue-600 text-white"
                    : "rounded-tl-sm bg-white text-slate-800 border border-slate-200",
                )}
              >
                <p>{msg.content}</p>
                <p
                  className={cn(
                    "mt-1 text-right text-[10px]",
                    isAgent ? "text-blue-200" : "text-slate-400",
                  )}
                >
                  {msg.timestamp}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-end gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-200">
          <button
            type="button"
            title="Attach file"
            className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <Paperclip className="size-4" />
          </button>
          <button
            type="button"
            title="Emoji"
            className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <Smile className="size-4" />
          </button>
          <textarea
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message… (Enter to send)"
            className="flex-1 resize-none bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <Button
            size="icon-sm"
            onClick={handleSend}
            disabled={!draft.trim()}
            className="shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
