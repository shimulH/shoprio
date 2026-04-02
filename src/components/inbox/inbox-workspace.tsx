"use client";

import { useState } from "react";
import { Conversation } from "@/types/inbox";
import { ConversationList } from "@/components/inbox/conversation-list";
import { ChatMessages } from "@/components/inbox/chat-messages";
import { OrderPanel } from "@/components/inbox/order-panel";

type InboxWorkspaceProps = {
  initialConversations: Conversation[];
};

export function InboxWorkspace({ initialConversations }: InboxWorkspaceProps) {
  const [conversations, setConversations] =
    useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string>(
    initialConversations[0]?.id ?? "",
  );

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? conversations[0];

  function handleSelectConversation(id: string) {
    setActiveId(id);
    // Clear unread count when opening
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    );
  }

  function handleSendMessage(text: string) {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const newMessage = {
          id: `m-${Date.now()}`,
          sender: "agent" as const,
          content: text,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: text,
          lastMessageTime: newMessage.timestamp,
        };
      }),
    );
  }

  function handlePlaceOrder() {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId || !c.orderDraft) return c;
        return { ...c, orderDraft: { ...c.orderDraft, placed: true } };
      }),
    );
  }

  if (!activeConversation) return null;

  return (
    <div className="flex h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <ConversationList
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelectConversation}
      />
      <ChatMessages
        conversation={activeConversation}
        onSendMessage={handleSendMessage}
      />
      <OrderPanel
        conversation={activeConversation}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
}
