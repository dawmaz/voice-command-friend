import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "@/components/MessageBubble";
import { Message } from "@/types/message";
import { ChatInput } from "@/components/ChatInput";
import { CameraModal } from "@/components/CameraModal";
import { toast } from "sonner";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";

const TOAST_DURATION = 1000; // 1 second duration for toasts
const DEFAULT_NOTIFICATIONS: Notification[] = [];

interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(DEFAULT_NOTIFICATIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addNotification = (title: string, description?: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      description,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleAcknowledgeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared", {
      duration: TOAST_DURATION,
      position: "top-right"
    });
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate assistant response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm your AI assistant. I'm here to help you with any questions or tasks you have.",
        role: "assistant",
        timestamp: new Date(),
      };
      
      // Add delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessages((prev) => [...prev, assistantMessage]);
      toast.success("Message sent successfully", {
        duration: TOAST_DURATION,
        position: "top-right"
      });
      addNotification("Message Sent", "Your message was delivered successfully");
    } catch (error) {
      toast.error("Failed to send message", {
        duration: TOAST_DURATION,
        position: "top-right"
      });
      addNotification("Error", "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRecording = () => {
    toast.info("Started recording...", {
      duration: TOAST_DURATION,
      position: "top-right"
    });
    addNotification("Recording Started", "Voice recording has begun");
  };

  const handleStopRecording = () => {
    toast.success("Recording stopped", {
      duration: TOAST_DURATION,
      position: "top-right"
    });
    addNotification("Recording Stopped", "Voice recording has been completed");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
        <NotificationsDropdown 
          notifications={notifications} 
          onAcknowledge={handleAcknowledgeNotification}
          onClearAll={handleClearAllNotifications}
        />
      </div>

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
