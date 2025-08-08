export type MessageStatus = "sent" | "delivered" | "read";

export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  status: MessageStatus;
  sender: "me" | string;
}

export interface Chat {
  id:string;
  name: string;
  wa_id: string;
  avatarUrl: string;
  messages: Message[];
}
