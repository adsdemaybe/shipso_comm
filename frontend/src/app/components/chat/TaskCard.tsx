import React from 'react';
import { Check, X, Clock, FileText, ArrowRight, Undo } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { TaskProps } from '../../types/chat';

interface TaskCardProps {
  task: TaskProps;
  onApprove?: () => void;
  onReject?: () => void;
  onUnapprove?: () => void;
}

export function TaskCard({ task, onApprove, onReject, onUnapprove }: TaskCardProps) {
  const isPending = task.status === 'pending';
  
  return (
    <Card className="p-4 border border-slate-200 shadow-sm bg-white/50 hover:bg-white transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`
            ${task.type === 'approval' ? 'text-amber-600 border-amber-200 bg-amber-50' : ''}
            ${task.type === 'signature' ? 'text-purple-600 border-purple-200 bg-purple-50' : ''}
            ${task.type === 'upload' ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}
          `}>
            {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
          </Badge>
          {task.deadline && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock size={12} /> {task.deadline}
            </span>
          )}
        </div>
        
        {task.status === 'approved' && (
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Approved</Badge>
            {onUnapprove && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 text-slate-400 hover:text-slate-600"
                onClick={onUnapprove}
                title="Unapprove (Move back to Pending)"
              >
                <Undo size={12} />
              </Button>
            )}
          </div>
        )}
      </div>

      <h4 className="font-semibold text-slate-800 text-sm mb-1">{task.title}</h4>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">{task.description}</p>
      
      {task.requestedBy && (
        <div className="text-xs text-slate-500 mb-2 font-medium">
          Requested by {task.requestedBy}
        </div>
      )}
      
      {task.context && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 bg-slate-50 p-1.5 rounded">
          <FileText size={12} />
          <span className="truncate">{task.context}</span>
        </div>
      )}

      {isPending ? (
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Button 
            size="sm" 
            className="w-full bg-slate-900 hover:bg-slate-800 text-white h-8 text-xs"
            onClick={onApprove}
          >
            <Check size={14} className="mr-1.5" /> Approve
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="w-full h-8 text-xs text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
            onClick={onReject}
          >
            <X size={14} className="mr-1.5" /> Deny
          </Button>
        </div>
      ) : (
        <div className="mt-2 text-xs text-slate-400 flex items-center justify-end">
          View details <ArrowRight size={12} className="ml-1" />
        </div>
      )}
    </Card>
  );
}
