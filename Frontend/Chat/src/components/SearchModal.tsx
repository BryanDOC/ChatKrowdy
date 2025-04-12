
import React, { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SEARCH_USERS } from '../graphql/queries/searchUsers';
import { SEND_FRIEND_REQUEST } from '../graphql/mutations/sendFriendRequest';
import UserSearchItem from './UserSearchItem';
import { useStore } from '../zustand';
import { User } from '../types';
import toast, { Toaster } from 'react-hot-toast';

interface SearchModalProps {
  setIsSearchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchModal({ setIsSearchModalOpen }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS, {
    fetchPolicy: 'no-cache',
  });

  
  const { user } = useStore();

  
  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    fetchPolicy: 'no-cache',
  });

  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length > 0) {
        searchUsers({ variables: { search: searchTerm } });
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchUsers]);

  
  const handleSendRequest = (receiverId: string) => {
    if (!user) {
      console.error('No hay usuario logueado');
      return;
    }
    sendFriendRequest({ variables: { senderId: user.id, receiverId } })
      .then((response) => {
        console.log(response.data.sendFriendRequest);
        toast.success('Solicitud de amistad enviada correctamente.');
        
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative p-6 bg-[#262626] rounded-xl shadow-lg w-[550px] h-[600px]">
        <h2 className="mb-4 text-xl text-white">Buscar</h2>
        <input
          type="text"
          placeholder="Escribe el nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded text-white"
        />
        <button
          onClick={() => setIsSearchModalOpen(false)}
          className="absolute top-2 right-2 text-[#fe7541] hover:text-[#e86436]"
        >
          Cerrar
        </button>
        <div className="mt-4 overflow-y-auto h-[calc(100%-150px)]">
          {loading && <p className="text-white">Buscando...</p>}
          {error && <p className="text-red-500">Error: {error.message}</p>}
          {data && data.searchUsers && data.searchUsers.length === 0 && (
            <p className="text-white">No se encontraron resultados.</p>
          )}
          {data &&
            data.searchUsers &&
            data.searchUsers.map((userResult: User) => (
              <UserSearchItem 
                key={userResult.id}
                imageUrl={`../src/assets/${userResult.username}.png`} 
                username={userResult.username}
                onSendRequest={() => handleSendRequest(userResult.id)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
