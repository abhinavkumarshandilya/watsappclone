"use client";

import { useState, useMemo, useEffect } from "react";
import { MessageCircle, Rss } from "lucide-react";

import { ChatList } from "@/components/whatsfake/chat-list";
import { ChatWindow } from "@/components/whatsfake/chat-window";
import type { Chat, Message } from "@/lib/types";
import { initialChats } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  useEffect(() => {
    if (window.innerWidth >= 768 && initialChats.length > 0) {
      setSelectedChatId(initialChats[0].id);
    }
  }, []);

  const selectedChat = useMemo(() => {
    return chats.find((c) => c.id === selectedChatId) ?? null;
  }, [chats, selectedChatId]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = (chatId: string, newMessage: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  };

  const handleBack = () => {
    setSelectedChatId(null);
  };

  return (
    <main className="h-dvh bg-gray-100 dark:bg-black flex items-center justify-center p-0 sm:p-4">
      <div className="w-full h-full sm:max-w-7xl sm:h-[calc(100vh-2rem)] sm:max-h-[1024px] bg-background text-foreground shadow-2xl sm:rounded-lg flex overflow-hidden">
        <div
          className={cn(
            "h-full w-full md:w-1/3 md:max-w-sm lg:max-w-md border-r border-border flex flex-col transition-transform duration-300 ease-in-out",
            {
              "max-md:-translate-x-full max-md:hidden": selectedChatId,
            }
          )}
        >
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
        </div>

        <div
          className={cn(
            "h-full w-full md:w-2/3 lg:flex-1 flex flex-col transition-transform duration-300 ease-in-out absolute md:static top-0 left-0",
            { "max-md:translate-x-full": !selectedChatId }
          )}
        >
          {selectedChat ? (
            <ChatWindow
              key={selectedChat.id}
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onBack={handleBack}
            />
          ) : (
            <div className="hidden h-full w-full flex-col items-center justify-center bg-secondary/50 p-4 md:flex">
              <div className="text-center flex flex-col items-center">
                <div className="p-4 rounded-full bg-primary/20 mb-4">
                  <Rss className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold text-foreground">
                  WhatsFake Web
                </h1>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Select a conversation from the sidebar to start messaging and use AI to predict read receipts.
                </p>
                <Button variant="link" className="mt-4 text-accent">
                  Learn more about this project
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
