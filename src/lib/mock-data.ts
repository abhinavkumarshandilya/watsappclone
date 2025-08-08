import type { Chat } from "./types";

export const initialChats: Chat[] = [
  {
    id: "1",
    name: "AI Assistant",
    wa_id: "+1 555-0101",
    avatarUrl: "https://placehold.co/100x100/A7D9A7/191C1A.png",
    messages: [
      {
        id: "msg1",
        text: "Hello! How can I help you predict read receipts today?",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        status: "read",
        sender: "AI Assistant",
      },
      {
        id: "msg2",
        text: "I was wondering when you'd expect a reply to an urgent message.",
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        status: "read",
        sender: "me",
      },
      {
        id: "msg3",
        text: "It depends on the context! For something marked 'urgent', a response is usually expected within an hour. Try sending a message and using the prediction tool!",
        timestamp: new Date(Date.now() - 1000 * 60 * 3),
        status: "read",
        sender: "AI Assistant",
      },
    ],
  },
  {
    id: "2",
    name: "Project Team",
    wa_id: "group:project-alpha",
    avatarUrl: "https://placehold.co/100x100/66B2FF/FFFFFF.png",
    messages: [
      {
        id: "msg4",
        text: "Hey team, just a reminder about the deadline tomorrow.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        status: "read",
        sender: "me",
      },
      {
        id: "msg5",
        text: "Got it, thanks!",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
        status: "delivered",
        sender: "Alice",
      },
       {
        id: "msg6",
        text: "Working on my part now, should be done in a few hours.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
        status: "sent",
        sender: "Bob",
      },
    ],
  },
  {
    id: "3",
    name: "Jane Doe",
    wa_id: "+1 555-0102",
    avatarUrl: "https://placehold.co/100x100/F0F0F0/191C1A.png",
    messages: [
      {
        id: "msg7",
        text: "Can we reschedule our meeting?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        status: "read",
        sender: "Jane Doe",
      },
      {
        id: "msg8",
        text: "Sure, how about Friday at 2 PM?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
        status: "delivered",
        sender: "me",
      },
    ],
  },
  {
    id: "4",
    name: "Lunch Crew",
    wa_id: "group:foodies",
    avatarUrl: "https://placehold.co/100x100/FFDDC1/191C1A.png",
    messages: [
      {
        id: "msg9",
        text: "Pizza today? 🍕",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        status: "read",
        sender: "Carlos",
      },
    ],
  },
    {
    id: "5",
    name: "Dr. Smith",
    wa_id: "+1 555-0105",
    avatarUrl: "https://placehold.co/100x100/C1D1FF/191C1A.png",
    messages: [
      {
        id: "msg10",
        text: "Your appointment is confirmed for tomorrow at 10 AM.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        status: "delivered",
        sender: "Dr. Smith",
      },
    ],
  },
];
