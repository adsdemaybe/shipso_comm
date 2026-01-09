import React from 'react';
import { Settings, LogOut, UserCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function UserProfile() {
  return (
    <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-3">
      <Avatar className="h-9 w-9">
        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-900">Jane Doe</div>
        <div className="text-xs text-slate-500">Logistics Manager</div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
            <Settings size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem className="cursor-pointer">
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Profile Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}