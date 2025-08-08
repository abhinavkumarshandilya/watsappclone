"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useTransition } from "react";
import { BrainCircuit, Loader2, Mic, Paperclip, SendHorizonal, Smile } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { sendMessageAction, predictReceiptAction } from "@/lib/actions";
import type { Chat, Message } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import type { PredictReadReceiptOutput } from "@/ai/flows/predict-read-receipt";

const formSchema = z.object({
  messageText: z.string().min(1),
});

interface MessageInputFormProps {
  chat: Chat;
  onMessageSend: (message: Message) => void;
}

export function MessageInputForm({ chat, onMessageSend }: MessageInputFormProps) {
  const [isSending, startSendMessageTransition] = useTransition();
  const [isPredicting, startPredictionTransition] = useTransition();
  const [prediction, setPrediction] = useState<PredictReadReceiptOutput | null>(null);
  
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageText: "",
    },
  });

  const messageTextValue = form.watch("messageText");

  const handlePredict = async () => {
    if (!messageTextValue) return;

    startPredictionTransition(async () => {
      const conversationHistory = [...chat.messages, { sender: 'me', text: messageTextValue }]
        .map(
          (m) => `${m.sender}: ${m.text}`
        )
        .join("\n");
      
      const result = await predictReceiptAction({ conversationHistory });
      
      if (result.error) {
        toast({
            variant: "destructive",
            title: "Prediction Failed",
            description: result.error,
        });
        setPrediction(null);
      } else {
        setPrediction(result.prediction || null);
      }
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startSendMessageTransition(async () => {
      const result = await sendMessageAction({ ...values, chatId: chat.id });
      if (result.success && result.message) {
        onMessageSend(result.message);
        form.reset();
      } else {
        // Handle error
        console.error("Failed to send message:", result.error);
      }
    });
  };

  return (
    <div className="flex items-end gap-2">
      <Button variant="ghost" size="icon">
        <Smile className="h-6 w-6 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon">
        <Paperclip className="h-6 w-6 text-muted-foreground" />
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow flex items-center gap-2">
          <FormField
            control={form.control}
            name="messageText"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Type a message"
                      autoComplete="off"
                      {...field}
                      className="rounded-full py-5 pr-20 bg-secondary/50"
                      disabled={isSending}
                    />
                    <Popover onOpenChange={() => setPrediction(null)}>
                        <PopoverTrigger asChild>
                            <Button type="button" size="icon" variant="ghost" className="absolute right-10 top-1/2 -translate-y-1/2" disabled={!messageTextValue || isPredicting} onClick={handlePredict}>
                                <BrainCircuit className="h-5 w-5 text-accent" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 mb-2">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Read Receipt Prediction</h4>
                                    <p className="text-sm text-muted-foreground">
                                    AI-powered prediction for when a read receipt is expected.
                                    </p>
                                </div>
                                {isPredicting && (
                                    <div className="flex items-center justify-center p-4">
                                        <Loader2 className="h-8 w-8 animate-spin text-accent" />
                                    </div>
                                )}
                                {prediction && !isPredicting && (
                                    <div className="text-sm space-y-2">
                                        <p><strong className="font-medium text-foreground">Reasoning:</strong> {prediction.reasoning}</p>
                                        <p><strong className="font-medium text-foreground">Expected by:</strong> {format(new Date(prediction.expectedReadReceiptTime), "Pp")}</p>
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" size="icon" className="rounded-full w-10 h-10 flex-shrink-0 bg-accent hover:bg-accent/90" disabled={!messageTextValue || isSending}>
            {isSending ? (
                <Loader2 className="h-5 w-5 animate-spin"/>
            ) : (
                <SendHorizonal className="h-5 w-5" />
            )}
          </Button>
        </form>
      </Form>
      
      <Button variant="ghost" size="icon">
        <Mic className="h-6 w-6 text-muted-foreground" />
      </Button>
    </div>
  );
}
