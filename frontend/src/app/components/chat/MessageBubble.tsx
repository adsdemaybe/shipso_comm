import React, { useState } from 'react';
import { Check, CheckCheck, Trash2, Pencil } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { TaskCard } from './TaskCard';
import { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onUnapprove?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
  onDelete?: (id: string) => void;
}

export function MessageBubble({ 
  message, 
  onApprove, 
  onReject, 
  onUnapprove,
  onEdit,
  onDelete
}: MessageBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const handleSaveEdit = () => {
    if (editContent.trim() !== message.content) {
      onEdit?.(message.id, editContent);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  return (
    <div 
      className={`flex gap-3 mb-6 group ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Avatar className="h-8 w-8 mt-1">
        <AvatarImage src={message.senderAvatar} />
        <AvatarFallback>{message.senderName[0]}</AvatarFallback>
      </Avatar>

      <div className={`flex flex-col max-w-[70%] ${message.isMe ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-xs font-medium text-slate-500">{message.senderName}</span>
          <span className="text-[10px] text-slate-400">{format(message.timestamp, 'HH:mm')}</span>
        </div>

        <div className="relative group/bubble">
          {/* Action Buttons */}
          {message.isMe && !isEditing && (
            <div className={`
              absolute -top-4 right-2
              flex items-center gap-1 bg-white shadow-sm border border-slate-200 rounded-full px-1.5 py-0.5
              transition-opacity duration-200
              z-10
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-colors"
                title="Edit"
              >
                <Pencil size={12} />
              </button>
              <div className="w-px h-3 bg-slate-200" />
              <button 
                onClick={() => onDelete?.(message.id)}
                className="p-1 text-slate-400 hover:text-red-600 hover:bg-slate-50 rounded-full transition-colors"
                title="Unsend"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}

          <div 
            className={`
              relative px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
              ${message.isMe 
                ? 'bg-black text-white rounded-tr-sm' 
                : 'bg-white border border-slate-100 text-slate-800 rounded-tl-sm'
              }
              ${isEditing ? 'w-[400px] max-w-full !bg-white !text-slate-900 border-slate-200' : ''}
            `}
          >
            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[80px] bg-slate-50 border-slate-200 resize-none text-slate-900 focus-visible:ring-black"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleCancelEdit}
                    className="h-7 px-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleSaveEdit}
                    className="h-7 px-3 bg-black text-white hover:bg-slate-800"
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {message.content}
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className={`mt-3 space-y-2 ${message.isMe ? 'text-slate-300' : 'text-slate-600'}`}>
                    {message.attachments.map((file, i) => (
                      <div key={i} className={`
                        flex items-center gap-3 p-2 rounded-lg border 
                        ${message.isMe ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-slate-50'}
                      `}>
                        <div className="h-8 w-8 rounded flex items-center justify-center bg-white/20">
                          <span className="text-xs font-bold uppercase">{file.type}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate text-xs">{file.name}</div>
                          <div className="text-[10px] opacity-70">{file.size}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* AI Suggested Task */}
        {!isEditing && message.attachedTask && (
          <div className="mt-2 w-full max-w-sm">
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                AI Suggestion
              </span>
            </div>
            <TaskCard 
              task={message.attachedTask} 
              onApprove={() => onApprove?.(message.attachedTask!.id)} 
              onReject={() => onReject?.(message.attachedTask!.id)} 
              onUnapprove={() => onUnapprove?.(message.attachedTask!.id)}
            />
          </div>
        )}
        
        {/* Read Receipts */}
        {!isEditing && message.isMe && (
          <div className="flex justify-end mt-1 px-1">
            {message.status === 'read' ? (
              <CheckCheck size={14} className="text-blue-500" />
            ) : (
              <Check size={14} className="text-slate-300" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
