# **App Name**: WhatsFake

## Core Features:

- UI Replication: Mimic the WhatsApp Web interface for a familiar user experience.
- Chat Grouping: Group conversations by user ID (wa_id) to organize chats.
- Message Display: Display message bubbles with date/time and status (sent, delivered, read).
- User Info Display: Show basic user information (name, number) for each conversation.
- Simulated Send: Implement a "Send Message" input box to simulate sending messages.
- Message Storage: Store submitted messages in the MongoDB database without sending externally.
- Read Receipt Prediction: Tool for predicting when users are likely to expect a "read" receipt based on conversation history. No messages will be sent.

## Style Guidelines:

- Primary color: Light Green (#A7D9A7), evoking the chat-bubble green of WhatsApp but more muted.
- Background color: Very light gray (#F0F0F0), almost white, to provide a clean backdrop that doesn't distract from the content.
- Accent color: Blue (#66B2FF), analogous to green, for interactive elements and highlights, creating visual interest without overpowering the design.
- Body and headline font: 'Inter' (sans-serif) for a clean and modern look suitable for both headlines and body text.
- Use simple, clean icons to represent message status (sent, delivered, read) and other actions.
- Responsive design to ensure usability on both desktop and mobile devices.
- Subtle animations for message arrival and status updates to enhance user experience.