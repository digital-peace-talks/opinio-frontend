import React, { createContext, useMemo, useState } from 'react';

interface Chat {
  userId: string;
  message: string;
}

type Chats = Chat[];
type SetChats = React.Dispatch<React.SetStateAction<Chats>>;

interface ChatsProps {
  chats: Chats;
  appendChats: (newChat: Chat) => any;
}

export const ChatsContext = createContext<ChatsProps | null>(null);

const appendChat = ([setChats]: [SetChats]) => (newChat: Chat) => {
  setChats((chats) => [...chats, newChat]);
}

export const ChatsProvider = (props: any) => {
  const [chats, setChats] = useState<Chats>([
    {
      userId: '1',
      message: 'I think Trump is the coolest thing to ever happen to this planet in all it\'s existence!',
    },
    {
      userId: '2',
      message: 'I think Trump is only good in business',
    },
    {
      userId: '1',
      message: 'I think Trump is only good in business',
    },
    {
      userId: '2',
      message: 'I think Trump is only good in business',
    },
    {
      userId: '1',
      message: 'I think Trump is only good in business',
    },
  ]);

  const value = useMemo(
    () => ({
      chats,
      appendChat: appendChat([setChats]),
    }),
    [chats]
  );

  return <ChatsContext.Provider value={value} {...props} />;
};