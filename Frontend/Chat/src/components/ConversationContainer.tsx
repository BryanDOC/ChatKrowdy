import React from 'react'
import MessageConversation from './MessageConversation'
import { ChatPerfilConversation, Message, User } from '../types/index'


interface ConversationContainerProps {
  openChat: boolean;
  conversationId: string;
  chatPerfil: ChatPerfilConversation | null;
  messageConversation: Message[];
  user: User | null;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConversationContainer({openChat,conversationId,chatPerfil,messageConversation,user}: ConversationContainerProps) {
  return (
    <div className="items-center justify-center w-full overflow-y-auto md:flex scrollbar-hide">
        {
          openChat ? (
            <MessageConversation conversationId={conversationId} chatPerfil={chatPerfil} messages={messageConversation} currentUserId={user?.id || ''} />
          ) : (
            <div className='flex flex-col items-center justify-center h-screen '>
              <img src="../src/assets/logoKrowdy.png" alt="" className='w-[100px]'/>
               <h1 className="text-3xl font-bold">Tus mensajes</h1>
            </div>
           
          )
        }
         </div>
    
       
  )
}
