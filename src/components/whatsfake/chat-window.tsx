"use client";

import { useEffect, useRef, useState } from "react";
import type { Chat, Message } from "@/lib/types";
import { MessageBubble } from "./message-bubble";
import { MessageInputForm } from "./message-input-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreVertical, Search, Phone } from "lucide-react";

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (chatId: string, message: Message) => void;
  onBack: () => void;
}

export function ChatWindow({ chat, onSendMessage, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState(chat.messages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.messages]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  const handleNewMessage = (newMessage: Message) => {
    setMessages(prev => [...prev, newMessage]);

    // Simulate delayed 'delivered' and 'read' statuses
    setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? {...m, status: 'delivered'} : m));
    }, 1500);
     setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === newMessage.id ? {...m, status: 'read'} : m));
    }, 3000);
    
    onSendMessage(chat.id, newMessage);
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex flex-col h-full bg-secondary/30 relative">
      <header className="flex-shrink-0 flex items-center justify-between p-3 border-b border-border bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3">
          <Button onClick={onBack} size="icon" variant="ghost" className="md:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatarUrl} alt={chat.name} data-ai-hint="person talking"/>
            <AvatarFallback>{getInitials(chat.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{chat.name}</p>
            <p className="text-xs text-muted-foreground">{chat.wa_id}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost">
            <Phone className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button size="icon" variant="ghost">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </header>

      <div className="flex-grow overflow-hidden relative">
         <ScrollArea className="h-full" viewportRef={scrollAreaRef}>
          <div className="px-4 py-2 space-y-2">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} chat={chat}/>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <footer className="flex-shrink-0 p-4 bg-background/95 z-10">
        <MessageInputForm chat={chat} onMessageSend={handleNewMessage} />
      </footer>
    </div>
  );
}
