import React from 'react';
import { Paperclip, Send } from 'lucide-react';
import { Button } from '../ui/button';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  placeholder?: string;
}

export function MessageInput({ 
  value, 
  onChange, 
  onSend, 
  onKeyDown,
  placeholder = "Type a message..."
}: MessageInputProps) {
  return (
    <div className="p-4 bg-white border-t border-slate-200 shrink-0">
      <div className="max-w-3xl mx-auto flex gap-2 items-end">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 mb-0.5">
          <Paperclip size={20} />
        </Button>
        
        <div className="flex-1 bg-slate-50 rounded-2xl border border-slate-200 focus-within:border-black focus-within:ring-1 focus-within:ring-black/10 transition-all flex items-end">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none focus:ring-0 p-3 max-h-32 resize-none text-sm text-slate-900 placeholder:text-slate-400"
            rows={1}
            style={{ minHeight: '44px' }}
          />
        </div>

        <Button 
          className="rounded-full h-11 w-11 bg-black hover:bg-slate-800 shadow-sm"
          onClick={onSend}
          disabled={!value.trim()}
        >
          <Send size={18} className="ml-0.5" />
        </Button>
      </div>
      <div className="max-w-3xl mx-auto mt-2 flex justify-between px-1">
        <div className="flex gap-4 text-[10px] text-slate-400">
          <span className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
            <span className="w-2 h-2 rounded bg-purple-200"></span>
            AI Suggestions Active
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
            <span className="w-2 h-2 rounded bg-amber-200"></span>
            Database Sync: Active
          </span>
        </div>
      </div>
    </div>
  );
}
