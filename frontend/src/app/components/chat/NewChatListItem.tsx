import React from 'react';
import { Edit3 } from 'lucide-react';

export function NewChatListItem() {
  return (
    <button
      className="w-full p-2 flex items-start gap-3 rounded-lg transition-colors text-left bg-white shadow-sm ring-1 ring-slate-200"
    >
      <div className="relative mt-0.5">
        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
          <Edit3 size={16} className="text-slate-600" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <span className="font-medium text-sm text-slate-900 leading-tight">
            New Chat...
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-0.5 leading-none">
          Composing message
        </div>
      </div>
    </button>
  );
}
