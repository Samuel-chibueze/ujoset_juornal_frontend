"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { User as UserType } from "./navbar";

interface UserDropdownProps {
  user?: UserType;
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-dropdown")) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
    router.push("/");
    setUserDropdownOpen(false);
  };

  const toggleUserDropdown = () => setUserDropdownOpen(!userDropdownOpen);

  if (!user) return null;

  return (
    <div className="relative user-dropdown">
      <Button
        variant="ghost"
        onClick={toggleUserDropdown}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
            unoptimized
          />
        ) : (
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <ChevronDown 
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
            userDropdownOpen ? "rotate-180" : ""
          }`} 
        />
      </Button>

      {userDropdownOpen && (
        <Card className="absolute right-0 top-full mt-2 w-64 shadow-xl border-0 z-50">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
                />
              ) : (
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
                <Badge variant="outline" className="mt-1 text-xs capitalize">
                  {user.role}
                </Badge>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/profile"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                onClick={() => setUserDropdownOpen(false)}
              >
                <User className="h-4 w-4 text-gray-500" />
                <span>Profile Settings</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                onClick={() => setUserDropdownOpen(false)}
              >
                <Settings className="h-4 w-4 text-gray-500" />
                <span>Preferences</span>
              </Link>
              <div className="border-t border-gray-100 my-2"></div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 h-auto"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign out
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}