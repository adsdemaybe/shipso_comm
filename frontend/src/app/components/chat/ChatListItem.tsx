import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ChatListItem as ChatListItemType } from '../../types/chat';

interface ChatListItemProps {
  chat: ChatListItemType;
  isSelected: boolean;
  onClick: () => void;
}

export function ChatListItem({ chat, isSelected, onClick }: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-2 flex items-start gap-3 rounded-lg transition-colors text-left ${
        isSelected 
          ? 'bg-white shadow-sm ring-1 ring-slate-200' 
          : 'hover:bg-slate-100'
      }`}
    >
      <div className="relative mt-0.5">
        <Avatar className="h-8 w-8">
          <AvatarImage src={chat.avatar} />
          <AvatarFallback>{chat.name[0]}</AvatarFallback>
        </Avatar>
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
          chat.status === 'online' ? 'bg-green-500' : 
          chat.status === 'busy' ? 'bg-amber-500' : 'bg-slate-300'
        }`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <span className="font-medium text-sm text-slate-900 leading-tight">
            {chat.name}
          </span>
          <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
            {chat.time}
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-0.5 leading-none">
          {chat.role}
        </div>
        <div className="text-xs text-slate-600 mt-1 leading-snug break-words">
          {chat.lastMessage}
        </div>
      </div>
      
      {chat.unread > 0 && (
        <Badge variant="default" className="bg-black text-white hover:bg-slate-800 h-5 px-1.5 min-w-[20px] flex items-center justify-center shrink-0">
          {chat.unread}
        </Badge>
      )}
    </button>
  );
}
