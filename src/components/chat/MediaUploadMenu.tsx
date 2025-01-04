import { Image, Camera } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Message } from "@/types/message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MediaUploadMenuProps {
  onImageUpload: (message: Message) => void;
  onStartCamera: () => void;
}

export const MediaUploadMenu = ({ onImageUpload, onStartCamera }: MediaUploadMenuProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    const imageUrl = URL.createObjectURL(file);
    const message: Message = {
      id: Date.now().toString(),
      content: `Sent an image: ${file.name}`,
      role: "user",
      timestamp: new Date(),
      mediaUrl: imageUrl,
      mediaType: "image"
    };

    onImageUpload(message);

    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Image className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={handleImageClick}>
            <Image className="w-4 h-4 mr-2" />
            Upload Image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onStartCamera}>
            <Camera className="w-4 h-4 mr-2" />
            Take Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </>
  );
};