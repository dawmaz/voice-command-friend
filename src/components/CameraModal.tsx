import { useRef, useEffect } from "react";
import { toast } from "sonner";
import { Message } from "@/types/message";

interface CameraModalProps {
  onClose: () => void;
  onPhotoCapture: (message: Message) => void;
}

export const CameraModal = ({ onClose, onPhotoCapture }: CameraModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const takePhoto = () => {
    if (!videoRef.current || !videoRef.current.srcObject) {
      toast.error('Camera not initialized properly');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    
    if (ctx && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const imageUrl = URL.createObjectURL(blob);
          const message: Message = {
            id: Date.now().toString(),
            content: `Captured photo from camera`,
            role: "user",
            timestamp: new Date(),
            mediaUrl: imageUrl,
            mediaType: "image"
          };
          onPhotoCapture(message);
          toast.success('Photo captured successfully');
          handleClose();
        }
      }, 'image/jpeg');
    }
  };

  const handleClose = () => {
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    onClose();
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        toast.error('Failed to access camera');
        onClose();
      }
    };
    
    startCamera();
    
    // Cleanup function
    return () => {
      const stream = videoRef.current?.srcObject as MediaStream | null;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded-lg mb-4"
        />
        <div className="flex justify-center gap-4">
          <button
            onClick={takePhoto}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Take Photo
          </button>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};