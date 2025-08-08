"use server";

import { z } from "zod";
import type { Message } from "./types";
import { predictReadReceipt, PredictReadReceiptOutput } from "@/ai/flows/predict-read-receipt";

const sendMessageSchema = z.object({
  messageText: z.string().min(1, "Message cannot be empty."),
  chatId: z.string(),
});

export async function sendMessageAction(
  values: z.infer<typeof sendMessageSchema>
) {
  const validatedFields = sendMessageSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid message" };
  }

  const { messageText } = validatedFields.data;

  // Simulate network delay and DB operation
  await new Promise((res) => setTimeout(res, 500));

  const newMessage: Message = {
    id: crypto.randomUUID(),
    text: messageText,
    timestamp: new Date(),
    status: "sent", // Initially sent, will be updated to delivered
    sender: "me",
  };

  return { success: true, message: newMessage };
}


const predictReceiptSchema = z.object({
  conversationHistory: z.string(),
});

export async function predictReceiptAction(values: z.infer<typeof predictReceiptSchema>): Promise<{
    prediction?: PredictReadReceiptOutput;
    error?: string;
}> {
    const validatedFields = predictReceiptSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid input for prediction." };
    }

    try {
        const prediction = await predictReadReceipt({
            conversationHistory: validatedFields.data.conversationHistory,
        });
        return { prediction };
    } catch (error) {
        console.error("Error predicting read receipt:", error);
        return { error: "Failed to get prediction. Please try again." };
    }
}
