import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp: Date;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
  onAcknowledge?: (id: string) => void;
  onClearAll?: () => void;
}

export function NotificationsDropdown({ 
  notifications, 
  onAcknowledge,
  onClearAll 
}: NotificationsDropdownProps) {
  const handleNotificationClick = (id: string) => {
    onAcknowledge?.(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-muted-foreground">
            No notifications
          </DropdownMenuItem>
        ) : (
          <>
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="flex flex-col items-start gap-1 py-3 cursor-pointer"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="font-medium">{notification.title}</div>
                  {notification.description && (
                    <div className="text-sm text-muted-foreground">
                      {notification.description}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString()}
                  </div>
                </DropdownMenuItem>
              ))}
            </ScrollArea>
            <div className="p-2 border-t">
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={() => onClearAll?.()}
              >
                Clear All
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}