"use client";

import type { Chat, Message } from "@/lib/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { StatusIcon } from "./status-icon";

interface MessageBubbleProps {
  message: Message;
  chat: Chat;
}

export function MessageBubble({ message, chat }: MessageBubbleProps) {
  const isMe = message.sender === "me";

  return (
    <div
      className={cn(
        "flex items-end gap-2 w-full animate-in fade-in slide-in-from-bottom-2 duration-300",
        {
          "justify-end": isMe,
          "justify-start": !isMe,
        }
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-3 py-2 text-sm shadow-sm relative",
          {
            "bg-primary text-primary-foreground rounded-br-none": isMe,
            "bg-card text-card-foreground rounded-bl-none": !isMe,
          }
        )}
      >
        {!isMe && chat.name !== message.sender && (
          <p className="text-xs font-semibold text-accent pb-1">{message.sender}</p>
        )}
        <p className="whitespace-pre-wrap">{message.text}</p>
        <div className="flex items-center justify-end gap-1 mt-1 -mb-1 -mr-1">
          <span className="text-xs text-muted-foreground/70">{format(new Date(message.timestamp), "p")}</span>
          {isMe && <StatusIcon status={message.status} className="h-4 w-4" />}
        </div>
      </div>
    </div>
  );
}
