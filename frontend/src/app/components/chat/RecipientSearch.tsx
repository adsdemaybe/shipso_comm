import React from 'react';
import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { SuggestedUser } from '../../types/chat';

interface RecipientSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRecipient: SuggestedUser | null;
  onSelectRecipient: (user: SuggestedUser) => void;
  onRemoveRecipient: () => void;
  filteredUsers: SuggestedUser[];
}

export function RecipientSearch({
  searchQuery,
  onSearchChange,
  selectedRecipient,
  onSelectRecipient,
  onRemoveRecipient,
  filteredUsers
}: RecipientSearchProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-3 shrink-0">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-600 shrink-0">To:</span>
        <div className="flex-1 flex flex-wrap gap-2 items-center">
          {selectedRecipient ? (
            <Badge 
              variant="secondary" 
              className="bg-slate-900 text-white hover:bg-slate-800 pl-1 pr-2 py-1 gap-1.5"
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src={selectedRecipient.avatar} />
                <AvatarFallback className="text-[10px]">{selectedRecipient.name[0]}</AvatarFallback>
              </Avatar>
              <span>{selectedRecipient.name}</span>
              <button
                onClick={onRemoveRecipient}
                className="hover:bg-slate-700 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </Badge>
          ) : (
            <Input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Type a name or email..."
              className="flex-1 border-0 focus-visible:ring-0 bg-transparent text-sm placeholder:text-slate-400 px-0"
              autoFocus
            />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {searchQuery && !selectedRecipient && filteredUsers.length > 0 && (
        <div className="mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectRecipient(user)}
              className="w-full p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 last:border-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-slate-900">{user.name}</div>
                <div className="text-xs text-slate-500">{user.email}</div>
                <div className="text-xs text-slate-400">{user.role}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {searchQuery && !selectedRecipient && filteredUsers.length === 0 && (
        <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-500 text-center">
          No users found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
