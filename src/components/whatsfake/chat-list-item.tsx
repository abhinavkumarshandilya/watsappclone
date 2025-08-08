
"use client";

import type { Chat } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { StatusIcon } from "./status-icon";
import { useEffect, useState } from "react";

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ChatListItem({ chat, isSelected, onSelect }: ChatListItemProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const lastMessage = chat.messages[chat.messages.length - 1];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <button
      onClick={() => onSelect(chat.id)}
      className={cn(
        "flex w-full items-start gap-3 p-4 text-left transition-colors",
        isSelected
          ? "bg-accent/20 dark:bg-accent/10"
          : "hover:bg-secondary/50 dark:hover:bg-white/5"
      )}
    >
      <Avatar className="h-12 w-12 flex-shrink-0">
        <AvatarImage src={chat.avatarUrl} alt={chat.name} data-ai-hint="profile picture"/>
        <AvatarFallback className="text-lg bg-primary/20 text-primary-foreground">
          {getInitials(chat.name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow border-b border-border pb-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-foreground">{chat.name}</p>
          {isClient && (
            <p
              className={cn(
                "text-xs",
                isSelected ? "text-accent-foreground font-medium" : "text-muted-foreground"
              )}
            >
              {format(lastMessage.timestamp, "p")}
            </p>
          )}
        </div>
        <div className="flex items-center mt-1">
          {lastMessage.sender === 'me' && <StatusIcon status={lastMessage.status} className="mr-1 h-4 w-4 flex-shrink-0"/>}
          <p className="text-sm text-muted-foreground truncate flex-grow">
            {lastMessage.text}
          </p>
        </div>
      </div>
    </button>
  );
}
