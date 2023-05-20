import { useContext } from 'react';
import { ChatContext } from '../contexts/chat';

export const useChatContext = () => {
const context = useContext(ChatContext);

  if (!context) 
    throw new Error("useChatContext requires a ChatProvider!");

  return context;
};