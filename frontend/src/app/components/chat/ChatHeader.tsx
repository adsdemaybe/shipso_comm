import React from 'react';
import { Phone, Video, MoreVertical, Box, Anchor } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { ChatDetails } from '../../types/chat';

interface ChatHeaderProps {
  chatId: string;
  chatDetails: ChatDetails;
}

export function ChatHeader({ chatId, chatDetails }: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-10 shrink-0">
      <div className="flex items-center gap-3">
        {chatDetails.avatar ? (
          <Avatar className="h-10 w-10">
            <AvatarImage src={chatDetails.avatar} />
            <AvatarFallback>{chatDetails.name[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${chatId.includes('procurement') ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
            {chatId.includes('procurement') ? <Box size={20} /> : <Anchor size={20} />}
          </div>
        )}
        
        <div>
          <h2 className="font-semibold text-slate-900 leading-tight">{chatDetails.name}</h2>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className={`w-2 h-2 rounded-full ${
              chatDetails.status === 'online' ? 'bg-green-500' : 
              chatDetails.status === 'busy' ? 'bg-amber-500' : 'bg-slate-300'
            }`}></span>
            {chatDetails.status.charAt(0).toUpperCase() + chatDetails.status.slice(1)} • {chatDetails.role}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                <Phone size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start Voice Call</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
                <Video size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start Video Call</TooltipContent>
          </Tooltip>
          
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900">
            <MoreVertical size={20} />
          </Button>
        </TooltipProvider>
      </div>
    </header>
  );
}
