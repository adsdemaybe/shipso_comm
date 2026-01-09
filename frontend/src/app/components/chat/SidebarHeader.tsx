import React from 'react';
import { MessageSquare, Truck, FileText, Users } from 'lucide-react';
import { Button } from '../ui/button';

export function SidebarHeader() {
  return (
    <div className="p-4 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 3L2 9L12 15L22 9L12 3ZM2 11L12 17L22 11V17L12 23L2 17V11Z" fill="white"/>
          </svg>
        </div>
        <h1 className="font-semibold text-lg text-slate-900">Shipso</h1>
      </div>

      {/* Navigation */}
      <div className="flex justify-between gap-1">
        <Button variant="ghost" size="icon" className="flex-1 text-slate-900 bg-slate-100 hover:bg-slate-200">
          <MessageSquare size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
          <Truck size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
          <FileText size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="flex-1 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
          <Users size={20} />
        </Button>
      </div>
    </div>
  );
}
