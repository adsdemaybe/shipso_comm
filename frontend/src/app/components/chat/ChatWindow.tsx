import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { MessageBubble } from './MessageBubble';
import { ChatHeader } from './ChatHeader';
import { EmptyState } from './EmptyState';
import { MessageInput } from './MessageInput';
import { NewChatComposer } from './NewChatComposer';
import { TaskProps, Message } from '../../types/chat';
import { CHAT_DETAILS, MESSAGES_BY_CHAT } from '../../data/mockData';

interface ChatWindowProps {
  chatId: string;
  tasks: TaskProps[];
  onApproveTask: (id: string) => void;
  onRejectTask: (id: string) => void;
  onUnapproveTask: (id: string) => void;
  isNewChatMode?: boolean;
  onCreateChat?: (recipientName: string, recipientEmail: string) => void;
  onCancelNewChat?: () => void;
}

export function ChatWindow({ 
  chatId, 
  tasks,
  onApproveTask,
  onRejectTask,
  onUnapproveTask,
  isNewChatMode,
  onCreateChat,
  onCancelNewChat
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setMessages(MESSAGES_BY_CHAT[chatId] || []);
  }, [chatId]);

  // Sync messages with current tasks state
  const messagesWithSyncedTasks = messages.map(msg => {
    if (!msg.attachedTask) return msg;
    const currentTask = tasks.find(t => t.id === msg.attachedTask?.id);
    return currentTask ? { ...msg, attachedTask: currentTask } : msg;
  });

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesWithSyncedTasks]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Jane Doe',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100',
      content: inputValue,
      timestamp: new Date(),
      isMe: true,
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleEditMessage = (id: string, newContent: string) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, content: newContent } : m
    ));
  };

  // Show new chat composer
  if (isNewChatMode && onCreateChat && onCancelNewChat) {
    return <NewChatComposer onCreateChat={onCreateChat} onCancel={onCancelNewChat} />;
  }

  // Show empty state when no chat is selected
  if (!chatId) {
    return <EmptyState />;
  }

  const chatDetails = CHAT_DETAILS[chatId];

  // If chat doesn't exist
  if (!chatDetails) {
    return <EmptyState title="Chat not found" message="" />;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50/50 overflow-hidden">
      {/* Header */}
      <ChatHeader chatId={chatId} chatDetails={chatDetails} />

      {/* Database Conflict Alert Banner - Only for c1 for now */}
      {chatId === 'c1' && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center justify-between text-sm text-amber-900 shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="font-medium">Data Conflict Detected:</span>
            <span className="opacity-90">Packing List Item A count differs (50 vs 70).</span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 text-xs text-amber-700 hover:bg-amber-100 hover:text-amber-900">
            Resolve
          </Button>
        </div>
      )}

      {/* Messages */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="max-w-3xl mx-auto px-6 py-6">
          {messagesWithSyncedTasks.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              onApprove={onApproveTask}
              onReject={onRejectTask}
              onUnapprove={onUnapproveTask}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <MessageInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
