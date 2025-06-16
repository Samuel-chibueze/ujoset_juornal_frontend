"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function NotificationBell() {
  const handleNotificationClick = () => {
    // Handle notification click logic here
    console.log("Notifications clicked");
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="relative p-2 hover:bg-gray-100"
      onClick={handleNotificationClick}
    >
      <Bell className="h-5 w-5 text-gray-600" />
      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-xs">
        3
      </Badge>
    </Button>
  );
}