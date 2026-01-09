export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
  attachedTask?: TaskProps;
  attachments?: { name: string; type: string; url: string; size: string }[];
}

export interface TaskProps {
  id: string;
  title: string;
  description: string;
  type: 'approval' | 'upload' | 'review' | 'signature';
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  assignee?: string;
  deadline?: string;
  context?: string;
  requestedBy?: string;
  chatId?: string;
}

export interface ChatDetails {
  name: string;
  avatar: string;
  status: string;
  role: string;
}

export interface ChatListItem {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: 'online' | 'busy' | 'offline';
  lastMessage: string;
  time: string;
  unread: number;
}

export interface SuggestedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}
