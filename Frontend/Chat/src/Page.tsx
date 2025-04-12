import { useState, useEffect} from 'react'
import { IoSearchOutline } from "react-icons/io5";
import SolicitudItem from './components/SolicitudItem';
import MessageItem from './components/MessageItem';
import { useStore } from './zustand'
import { PENDING_REQUESTS_QUERY } from './graphql/queries/pendingRequests';
import { RESPOND_TO_FRIEND_REQUEST_MUTATION } from './graphql/mutations/respondToFriendRequest';
import { FriendsWithLastMessage} from './graphql/queries/friendsWithLastMessage';
import { useQuery } from '@apollo/client';
import { PendingRequest} from './types/index'
import { FriendWithLastMessage} from './types/index'
import { useMutation } from '@apollo/client';
import SearchModal from './components/SearchModal';
import  { Toaster } from 'react-hot-toast';
import ConversationContainer from './components/ConversationContainer';
import { CREATE_CONVERSATION } from './graphql/mutations/createConversation'
import { IoIosArrowDropleftCircle } from "react-icons/io";


export default function Page() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'mensajes' | 'solicitudes'>('mensajes');
  const { user, openChat, setOpenChat,setConversationId, messageConversation, chatPerfil, conversationId } = useStore();
  const [friendWithLastMessage, setFriendWithLastMessage] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [showConversation, setShowConversation] = useState(false); 
  const [createConversation] = useMutation(CREATE_CONVERSATION);

  const { data: dataPendingRequests } = useQuery(PENDING_REQUESTS_QUERY, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const { data: dataFriendsWithLastMessage } = useQuery(FriendsWithLastMessage, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  const [respondToFriendRequest] = useMutation(RESPOND_TO_FRIEND_REQUEST_MUTATION);

  useEffect(() => {
    if (dataFriendsWithLastMessage?.friendsWithLastMessage) {
      setFriendWithLastMessage(dataFriendsWithLastMessage.friendsWithLastMessage);
    }
  }, [dataFriendsWithLastMessage]);

  useEffect(() => {
    if (dataPendingRequests?.pendingRequests) {
      setPendingRequests(dataPendingRequests.pendingRequests);
    }
  }, [dataPendingRequests]);

  const handleRespond = async (requestId: string, accept: boolean, senderId: string, receiverId: string) => {
    try {
      await respondToFriendRequest({ variables: { requestId, accept } });
      setPendingRequests(prev => prev.filter(req => req.id !== requestId));
  
      if (accept) {
       
        const { data } = await createConversation({
          variables: { senderId, receiverId },
        });
        const convoId = data.createConversation.id;
        
        setConversationId(convoId);
       
      
      }
    } catch (error) {
      console.error('Error al responder la solicitud:', error);
    }
  };

  const handleSelectChat = (convId: string) => {
    setConversationId(convId);
    setOpenChat(true);
    setShowConversation(true);
  };

 
  const handleBack = () => {
    setShowConversation(false);
  };

  return (
    <div className="flex flex-col h-screen pt-4 overflow-hidden text-white bg-black md:flex-row">
      <Toaster position="bottom-right" />

           <div
        className={`
          w-full md:w-[25%] border-r border-gray-700 p-4 flex flex-col
          ${showConversation ? 'hidden' : 'block'} md:block
        `}
      >
       
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">{user?.username}</h2>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
          <button onClick={() => setIsSearchModalOpen(true)}>
            <IoSearchOutline size={32} className="text-white" />
          </button>
        </div>

                <div className="mb-4">
          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('mensajes')}
              className={`pb-2 text-gray-500 ${activeTab === 'mensajes' ? 'border-b-2 font-bold text-white border-[#fe7541]' : ''}`}
            >
              Mensajes
            </button>
            <div className="relative">
              <button
                onClick={() => setActiveTab('solicitudes')}
                className={`pb-2 text-gray-500 ${activeTab === 'solicitudes' ? 'border-b-2 font-bold text-white border-[#fe7541]' : ''}`}
              >
                Solicitudes
              </button>
              <div className="absolute flex items-center justify-center w-5 h-5 text-xs bg-red-500 rounded-full -top-4 -right-2">
                {pendingRequests.length}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activeTab === 'mensajes' ? (
            <ul>
              {friendWithLastMessage.map((friend: FriendWithLastMessage) => (
                <MessageItem
                  key={friend.id}
                  imageUrl={`../src/assets/${friend.username}.png`}
                  name={friend.username}
                  lastMessage={friend.lastMessage}
                  conversationId={friend.conversationId}
                  onClick={() => handleSelectChat(friend.conversationId)}
                />
              ))}
            </ul>
          ) : (
            <ul>
              {pendingRequests.map((req: PendingRequest) => (
                <SolicitudItem
                  key={req.id}
                  imageUrl={`../src/assets/${req.sender_username}.png`}
                  sender_id={req.sender_id}
                  sender_username={req.sender_username}
                  onConfirm={() => handleRespond(req.id, true, req.sender_id, user?.id || '')}
                  onReject={() => handleRespond(req.id, false, req.sender_id, user?.id || '')}
                />
              ))}
            </ul>
          )}
        </div>
      </div>

      
      <div
  className={`
    flex-1 h-full
    ${showConversation ? 'block' : 'hidden'} md:block
  `}
>
 
  <div className="flex items-center p-4 bg-black md:hidden">
    <button onClick={handleBack} className="mr-4">
    
    <IoIosArrowDropleftCircle size={24}/>
    </button>
    <h2 className="font-bold">{chatPerfil?.username || 'Conversación'}</h2>
  </div>


  <ConversationContainer
    openChat={openChat}
    conversationId={conversationId}
    chatPerfil={chatPerfil}
    messageConversation={messageConversation}
    user={user}
    isSearchModalOpen={isSearchModalOpen}
    setIsSearchModalOpen={setIsSearchModalOpen}
  />
</div>

      {isSearchModalOpen && <SearchModal setIsSearchModalOpen={setIsSearchModalOpen} />}
    </div>
  );
}