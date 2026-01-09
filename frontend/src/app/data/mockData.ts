import { ChatDetails, Message, SuggestedUser } from '../types/chat';

// Mock chat details
export const CHAT_DETAILS: Record<string, ChatDetails> = {};

// Mock messages by chat
export const MESSAGES_BY_CHAT: Record<string, Message[]> = {};

// Mock chats list
export const MOCK_CHATS: any[] = [];

// Suggested users for new chat
export const SUGGESTED_USERS: SuggestedUser[] = [
  { 
    id: '1', 
    name: 'Sarah Chen', 
    email: 'sarah.chen@acmeshipping.com', 
    role: 'Freight Forwarder',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
  },
  { 
    id: '2', 
    name: 'Marcus Rodriguez', 
    email: 'marcus@portlogistics.com', 
    role: 'Port Operations Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100'
  },
  { 
    id: '3', 
    name: 'Olivia Thompson', 
    email: 'o.thompson@globalcargo.com', 
    role: 'Customs Broker',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100'
  },
  { 
    id: '4', 
    name: 'James Park', 
    email: 'jpark@shiptech.io', 
    role: 'Warehouse Coordinator',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
  },
];
