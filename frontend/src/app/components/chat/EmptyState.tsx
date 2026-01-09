import React from 'react';
import { MessageSquare } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export function EmptyState({ 
  title = "Welcome to Shipso", 
  message = "Select a stakeholder from the sidebar to start a conversation." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col h-full bg-white items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquare size={40} className="text-slate-400" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">{title}</h2>
        <p className="text-slate-500">{message}</p>
      </div>
    </div>
  );
}
