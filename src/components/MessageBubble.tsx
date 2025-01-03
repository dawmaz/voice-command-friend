import { Message } from "@/types/message";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 mb-2",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        <p className="text-sm">{message.content}</p>
        {message.mediaType === "image" && message.mediaUrl && (
          <img 
            src={message.mediaUrl} 
            alt="Uploaded content" 
            className="mt-2 rounded-lg max-w-full h-auto"
          />
        )}
        {message.mediaType === "audio" && message.mediaUrl && (
          <audio 
            controls 
            className="mt-2 w-full"
          >
            <source src={message.mediaUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
    </div>
  );
};