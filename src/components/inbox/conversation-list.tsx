"use client";

import { cn } from "@buildd/utils";
import { Conversation, Platform } from "@/types/inbox";

const platformConfig: Record<Platform, { label: string; color: string }> = {
  facebook: { label: "FB", color: "bg-blue-600 text-white" },
  whatsapp: { label: "WA", color: "bg-green-500 text-white" },
  tiktok: { label: "TK", color: "bg-slate-900 text-white" },
  instagram: { label: "IG", color: "bg-pink-600 text-white" },
  messenger: { label: "MS", color: "bg-blue-500 text-white" },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

type ConversationListProps = {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
};

export function ConversationList({
  conversations,
  activeId,
  onSelect,
}: ConversationListProps) {
  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Inbox</h2>
          <p className="text-xs text-slate-500">
            {conversations.filter((c) => c.unread > 0).length} unread
          </p>
        </div>
        <span className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
          {conversations.length}
        </span>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => {
          const platform = platformConfig[conv.platform];
          const isActive = conv.id === activeId;
          return (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition-colors hover:bg-slate-50",
                isActive && "bg-blue-50 hover:bg-blue-50",
              )}
            >
              {/* Avatar with platform badge */}
              <div className="relative shrink-0">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                  {getInitials(conv.customer)}
                </div>
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[8px] font-bold",
                    platform.color,
                  )}
                >
                  {platform.label[0]}
                </span>
              </div>

              {/* Text content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-sm",
                      conv.unread > 0
                        ? "font-semibold text-slate-900"
                        : "font-medium text-slate-700",
                    )}
                  >
                    {conv.customer}
                  </span>
                  <span className="shrink-0 text-[11px] text-slate-400">
                    {conv.lastMessageTime}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className="truncate text-xs text-slate-500">
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                    platform.color,
                  )}
                >
                  {platform.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
