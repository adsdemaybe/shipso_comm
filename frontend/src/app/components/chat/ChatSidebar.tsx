import React from 'react';
import { Plus } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { SidebarHeader } from './SidebarHeader';
import { SidebarSearch } from './SidebarSearch';
import { ChatListItem } from './ChatListItem';
import { NewChatListItem } from './NewChatListItem';
import { UserProfile } from './UserProfile';
import { MOCK_CHATS } from '../../data/mockData';

interface SidebarProps {
  selectedChat: string;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  isNewChatMode?: boolean;
}

export function Sidebar({ selectedChat, onSelectChat, onNewChat, isNewChatMode }: SidebarProps) {
  return (
    <div className="flex flex-col bg-slate-50 h-full w-full">
      {/* Header */}
      <SidebarHeader />

      {/* Search */}
      <SidebarSearch />

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {/* Stakeholders Group */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2 flex justify-between items-center">
              <span>Stakeholders</span>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-5 w-5 p-0 hover:bg-slate-200"
                title="New Stakeholder Chat"
                onClick={onNewChat}
              >
                <Plus size={14} className="cursor-pointer hover:text-slate-600" />
              </Button>
            </h3>
            <div className="space-y-1">
              {/* New Chat Composer Item */}
              {isNewChatMode && <NewChatListItem />}

              {MOCK_CHATS.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={selectedChat === chat.id}
                  onClick={() => onSelectChat(chat.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      {/* User Profile */}
      <UserProfile />
    </div>
  );
}