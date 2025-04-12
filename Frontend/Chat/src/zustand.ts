import { create } from 'zustand'
import { User, Message, ChatPerfilConversation } from './types'

type Store = {
    user: User | null
    setUser: (user: User) => void
    messageConversation: Message[]
    setMessageConversation: (messages: Message[]) => void
    openChat: boolean
    setOpenChat: (openChat: boolean) => void
    chatPerfil: ChatPerfilConversation | null;
    setChatPerfil: (perfil: ChatPerfilConversation) => void;
    conversationId: string;
    setConversationId: (conversationId: string) => void
}



export const useStore = create<Store>()((set) => ({
    user: null,
    setUser: (user: User) => set({ user: user }),
    messageConversation: [],
    setMessageConversation: (messages: Message[]) => set({ messageConversation: messages }),
    openChat: false,
    setOpenChat: (openChat: boolean) => set({ openChat: openChat }),
    chatPerfil: null,
    setChatPerfil: (perfil: ChatPerfilConversation) => set({ chatPerfil: perfil }),
    conversationId: '',
    setConversationId: (conversationId: string) => set({ conversationId: conversationId }),
    
}))