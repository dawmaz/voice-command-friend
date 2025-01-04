import { useRef } from "react";
import { toast } from "sonner";
import { Message } from "@/types/message";
import { RecordButton } from "../RecordButton";

interface AudioRecorderProps {
  onAudioMessage: (message: Message) => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const AudioRecorder = ({
  onAudioMessage,
  onStartRecording,
  onStopRecording,
}: AudioRecorderProps) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const message: Message = {
          id: Date.now().toString(),
          content: "Voice message",
          role: "user",
          timestamp: new Date(),
          mediaUrl: audioUrl,
          mediaType: "audio"
        };
        onAudioMessage(message);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      onStartRecording();
    } catch (error) {
      toast.error('Failed to start recording');
      console.error('Recording error:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      onStopRecording();
    }
  };

  return (
    <RecordButton
      onStartRecording={startRecording}
      onStopRecording={stopRecording}
    />
  );
};