import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { Message } from "@/types/message";
import { ChatInput } from "@/components/ChatInput";
import { CameraModal } from "@/components/CameraModal";
import { toast } from "sonner";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm your AI assistant. I'm here to help you with any questions or tasks you have.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleStartRecording = () => {
    toast.info("Started recording...");
  };

  const handleStopRecording = () => {
    toast.success("Recording stopped");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b bg-white">
        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {showCamera && (
        <CameraModal
          onClose={() => setShowCamera(false)}
          onPhotoCapture={(message) => {
            setMessages((prev) => [...prev, message]);
          }}
        />
      )}

      <ChatInput
        onSendMessage={handleSendMessage}
        onImageUpload={(message) => setMessages((prev) => [...prev, message])}
        onStartCamera={() => setShowCamera(true)}
        onStartRecording={handleStartRecording}
        onStopRecording={handleStopRecording}
      />
    </div>
  );
};

export default Index;
