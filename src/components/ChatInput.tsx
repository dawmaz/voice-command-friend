import { Message } from "@/types/message";
import { AudioRecorder } from "./chat/AudioRecorder";
import { MediaUploadMenu } from "./chat/MediaUploadMenu";
import { MessageInput } from "./chat/MessageInput";

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
  return (
    <div className="border-t bg-white p-4">
      <div className="flex items-center space-x-2 max-w-4xl mx-auto">
        <AudioRecorder
          onAudioMessage={onImageUpload}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
        />
        <MediaUploadMenu
          onImageUpload={onImageUpload}
          onStartCamera={onStartCamera}
        />
        <MessageInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
};