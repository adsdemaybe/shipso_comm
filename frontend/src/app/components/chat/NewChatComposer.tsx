import React, { useState } from 'react';
import { X, Send, Paperclip, UserPlus } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { RecipientSearch } from './RecipientSearch';
import { SUGGESTED_USERS } from '../../data/mockData';
import { SuggestedUser } from '../../types/chat';

interface NewChatComposerProps {
  onCreateChat: (recipientName: string, recipientEmail: string) => void;
  onCancel: () => void;
}

export function NewChatComposer({ onCreateChat, onCancel }: NewChatComposerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<SuggestedUser | null>(null);
  const [messageInput, setMessageInput] = useState('');

  const filteredUsers = SUGGESTED_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRecipient = (user: SuggestedUser) => {
    setSelectedRecipient(user);
    setSearchQuery('');
  };

  const handleRemoveRecipient = () => {
    setSelectedRecipient(null);
  };

  const handleStartChat = () => {
    if (selectedRecipient) {
      onCreateChat(selectedRecipient.name, selectedRecipient.email);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
            <UserPlus size={20} className="text-slate-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900 leading-tight">New Chat</h2>
            <p className="text-xs text-slate-500">Start a conversation with a stakeholder</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onCancel}
          className="text-slate-400 hover:text-slate-900"
        >
          <X size={20} />
        </Button>
      </header>

      {/* Recipient Search */}
      <RecipientSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRecipient={selectedRecipient}
        onSelectRecipient={handleSelectRecipient}
        onRemoveRecipient={handleRemoveRecipient}
        filteredUsers={filteredUsers}
      />

      {/* Message Area */}
      <div className="flex-1 min-h-0 flex flex-col">
        {selectedRecipient ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={selectedRecipient.avatar} />
                <AvatarFallback className="text-2xl">{selectedRecipient.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-slate-900 mb-1">{selectedRecipient.name}</h3>
              <p className="text-sm text-slate-500 mb-1">{selectedRecipient.email}</p>
              <p className="text-xs text-slate-400 mb-4">{selectedRecipient.role}</p>
              <p className="text-sm text-slate-600">Type a message below to start the conversation.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md px-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-500">Search for a stakeholder to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-400 hover:text-slate-600 mb-0.5"
            disabled={!selectedRecipient}
          >
            <Paperclip size={20} />
          </Button>
          
          <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-black focus-within:ring-1 focus-within:ring-black/10 transition-all flex items-end">
            <textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={selectedRecipient ? "Type a message..." : "Select a recipient first..."}
              className="flex-1 bg-transparent border-none focus:ring-0 p-3 max-h-32 resize-none text-sm text-slate-900 placeholder:text-slate-400"
              rows={1}
              style={{ minHeight: '44px' }}
              disabled={!selectedRecipient}
            />
          </div>

          <Button 
            className="rounded-full h-11 w-11 bg-black hover:bg-slate-800 shadow-sm"
            onClick={handleStartChat}
            disabled={!selectedRecipient || !messageInput.trim()}
          >
            <Send size={18} className="ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
