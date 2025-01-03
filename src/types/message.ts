export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
  mediaUrl?: string;
  mediaType?: "image" | "audio";
}