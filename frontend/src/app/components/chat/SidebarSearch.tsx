import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export function SidebarSearch() {
  return (
    <div className="p-4 border-b border-slate-200 bg-white">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search chats, shipments..." 
          className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-black"
        />
      </div>
    </div>
  );
}
