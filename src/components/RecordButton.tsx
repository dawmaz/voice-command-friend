import { Mic } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface RecordButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const RecordButton = ({ onStartRecording, onStopRecording }: RecordButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const handlePress = () => {
    if (isRecording) {
      setIsRecording(false);
      onStopRecording();
    } else {
      setIsRecording(true);
      onStartRecording();
    }
  };

  return (
    <button
      onClick={handlePress}
      className={cn(
        "relative p-3 rounded-full transition-colors",
        isRecording ? "bg-red-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      <Mic className="w-5 h-5" />
      {isRecording && (
        <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-pulse-ring" />
      )}
    </button>
  );
};