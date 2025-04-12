export interface User{
    id: string;
    username: string;
    email: string;
    
}
export interface SolicitudItemProps {
    imageUrl: string;
    sender_username: string;
    sender_id: string;
    onConfirm: () => void;
    onReject: () => void;
  }

export interface MessageItemProps {
    imageUrl: string;
    name: string;
    lastMessage: string;
    conversationId: string;
    onClick?: () => void;
  }

  export interface PendingRequest {
    id: string;
    sender_id: string;
    receiver_id: string;
    status: string;
    sender_username: string;
  }

  export interface FriendWithLastMessage {
    id: string;
    username: string;
    email: string;
    lastMessage: string;
    conversationId: string;
  }

  export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    created_at: string;
  }

  export interface MessageConversationProps {
    messages: Message[];
    currentUserId: string;
    chatPerfil: ChatPerfilConversation | null;
  }

  export interface ChatPerfilConversation{
    username: string;
    imageUrl: string;
  }