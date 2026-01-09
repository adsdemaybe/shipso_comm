import React from 'react';
import { FileText, Mail, MessageSquare, Database, ExternalLink } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export interface DocumentResult {
  id: string;
  title: string;
  source: 'gmail' | 'drive' | 'slack' | 'teams' | 'onedrive';
  date: string;
  summary: string;
  confidence: number;
  author: string;
}

export function DocumentCard({ doc }: { doc: DocumentResult }) {
  const getIcon = () => {
    switch (doc.source) {
      case 'gmail': return <Mail size={14} />;
      case 'slack': return <MessageSquare size={14} />;
      case 'drive': 
      case 'onedrive': return <FileText size={14} />;
      default: return <Database size={14} />;
    }
  };

  const getSourceColor = () => {
    switch (doc.source) {
      case 'gmail': return 'text-red-600 bg-red-50 border-red-100';
      case 'slack': return 'text-purple-600 bg-purple-50 border-purple-100';
      case 'drive': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'onedrive': return 'text-sky-600 bg-sky-50 border-sky-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  return (
    <Card className="p-3 mb-3 hover:shadow-md transition-shadow cursor-pointer group border-slate-200">
      <div className="flex justify-between items-start mb-2">
        <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium border ${getSourceColor()}`}>
          {getIcon()}
          <span className="capitalize">{doc.source}</span>
        </div>
        <span className="text-[10px] text-slate-400">{doc.date}</span>
      </div>

      <h4 className="text-sm font-semibold text-slate-800 mb-1 line-clamp-1 group-hover:text-black transition-colors">
        {doc.title}
      </h4>
      
      <p className="text-xs text-slate-500 line-clamp-2 mb-2">
        {doc.summary}
      </p>

      <div className="flex justify-between items-center pt-2 border-t border-slate-50">
        <span className="text-[10px] text-slate-400">
          By {doc.author}
        </span>
        <div className="flex items-center gap-2">
          {doc.confidence > 80 && (
             <Badge variant="secondary" className="h-4 text-[9px] px-1 bg-green-50 text-green-700">
               {doc.confidence}% Match
             </Badge>
          )}
          <ExternalLink size={12} className="text-slate-300 group-hover:text-slate-600" />
        </div>
      </div>
    </Card>
  );
}
