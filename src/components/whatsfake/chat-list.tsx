"use client";

import type { Chat } from "@/lib/types";
import { ChatListItem } from "./chat-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CirclePlus, MessageCircle, Rss, Search } from "lucide-react";
import { Button } from "../ui/button";

interface ChatListProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (id: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat }: ChatListProps) {
  return (
    <div className="bg-background/80 backdrop-blur-sm h-full flex flex-col">
      <header className="flex-shrink-0 p-4 border-b border-border">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Rss className="h-7 w-7 text-primary" />
                <h1 className="text-xl font-bold text-foreground">WhatsFake</h1>
            </div>
            <Button size="icon" variant="ghost">
                <CirclePlus className="h-5 w-5 text-muted-foreground"/>
            </Button>
        </div>
        <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search or start new chat" className="pl-9 bg-secondary/50"/>
        </div>
      </header>
      <ScrollArea className="flex-grow">
        <div className="flex flex-col">
          {chats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChatId === chat.id}
              onSelect={onSelectChat}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
