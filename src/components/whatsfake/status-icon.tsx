"use client";

import type { MessageStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, CheckCheck } from "lucide-react";

interface StatusIconProps {
  status: MessageStatus;
  className?: string;
}

export function StatusIcon({ status, className }: StatusIconProps) {
  switch (status) {
    case "sent":
      return <Check className={cn("text-muted-foreground/70", className)} />;
    case "delivered":
      return <CheckCheck className={cn("text-muted-foreground/70", className)} />;
    case "read":
      return <CheckCheck className={cn("text-accent", className)} />;
    default:
      return null;
  }
}
