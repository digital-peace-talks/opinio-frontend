import { useContext } from 'react';
import { ChatsContext } from '../contexts/chats';

export const useChatsContext = () => {
const context = useContext(ChatsContext);

  if (!context) 
    throw new Error("useChatsContext requires a ChatProvider!");

  return context;
};