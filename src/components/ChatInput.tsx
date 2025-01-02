import { Send, Image, Camera } from "lucide-react";
import { RecordButton } from "./RecordButton";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Message } from "@/types/message";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onImageUpload: (message: Message) => void;
  onStartCamera: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const ChatInput = ({
  onSendMessage,
  onImageUpload,
  onStartCamera,
  onStartRecording,
  onStopRecording
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      content: `Sent an image: ${file.name}`,
      role: "user",
      timestamp: new Date(),
    };

    onImageUpload(message);

    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center space-x-2 max-w-4xl mx-auto">
        <RecordButton
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
        />
        <button
          onClick={handleImageClick}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Image className="w-5 h-5" />
        </button>
        <button
          onClick={onStartCamera}
          className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Camera className="w-5 h-5" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept="image/*"
          className="hidden"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="p-3 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};