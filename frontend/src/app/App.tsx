import React, { useState } from 'react';
import { Sidebar } from './components/chat/ChatSidebar';
import { ChatWindow } from './components/chat/ChatWindow';
import { TaskProps } from './types/chat';

const INITIAL_TASKS: TaskProps[] = [];

export default function App() {
  const [selectedChat, setSelectedChat] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>(INITIAL_TASKS);
  const [isNewChatMode, setIsNewChatMode] = useState(false);

  const handleApproveTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'approved' } : t
    ));
  };

  const handleRejectTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'rejected' } : t
    ));
  };

  const handleUnapproveTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: 'pending' } : t
    ));
  };

  const handleNewChat = () => {
    setIsNewChatMode(true);
    setSelectedChat('');
  };

  const handleCreateChat = (recipientName: string, recipientEmail: string) => {
    const newChatId = `chat-${Date.now()}`;
    setSelectedChat(newChatId);
    setIsNewChatMode(false);
  };

  const handleCancelNewChat = () => {
    setIsNewChatMode(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Left Sidebar - Navigation & Chats */}
      <div className="w-96 flex-shrink-0 flex flex-col h-full border-r border-slate-200">
        <Sidebar 
          selectedChat={selectedChat} 
          onSelectChat={setSelectedChat}
          onNewChat={handleNewChat}
          isNewChatMode={isNewChatMode}
        />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <ChatWindow 
          chatId={selectedChat} 
          tasks={tasks}
          onApproveTask={handleApproveTask}
          onRejectTask={handleRejectTask}
          onUnapproveTask={handleUnapproveTask}
          isNewChatMode={isNewChatMode}
          onCreateChat={handleCreateChat}
          onCancelNewChat={handleCancelNewChat}
        />
      </main>
    </div>
  );
}