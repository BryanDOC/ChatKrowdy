import React,{useEffect} from 'react'
import {MessageItemProps} from '../types/index'
import { Messages } from '../graphql/queries/messages'
import { useLazyQuery } from '@apollo/client';


import {useStore} from '../zustand';

export default function MessageItem({ imageUrl, name, lastMessage, conversationId, onClick  }: MessageItemProps) {

  const [getMessages, { data}] = useLazyQuery(Messages);
  const {setMessageConversation, setOpenChat, setChatPerfil, setConversationId} = useStore();
  
  
  useEffect(() => {
    if (data && data.messages) {
      setMessageConversation(data.messages);
      setOpenChat(true);
      setChatPerfil({username: name, imageUrl: imageUrl});
      setConversationId(conversationId);
      
    }
  }, [data]);
  
  const handleClick = () => {
    getMessages({
      variables: { conversationId },
      fetchPolicy: 'no-cache', 
    });
    if (onClick) {
      onClick();
    }
     };
  
 
  return (
    <div className="flex items-center p-4 border-b border-gray-700"
    onClick={handleClick}
    >
  
    <img
      src={imageUrl}
      alt={name}
      className="object-cover w-12 h-12 mr-4 rounded-full"
    />

   
    <div className="flex-1">
      <h3 className="font-bold">{name}</h3>
      <p className="text-sm text-gray-400">{lastMessage}</p>
    </div>
  </div>
  )
}
