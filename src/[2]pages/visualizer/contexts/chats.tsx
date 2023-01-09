import React, { createContext, useMemo, useState } from 'react';
import { sleep } from '../../../[1]shared/util/sleep';

interface Chat {
  userId: string;
  message: string;
}

type Chats = Chat[];
type SetChats = React.Dispatch<React.SetStateAction<Chats>>;

interface ChatsProps {
  chats: Chats;
  appendChat: (newChat: Chat) => any;
}

const responseChats = [
  {
    userId: '2',
    message: 'Trump is good in business, but he is also good with leading people.',
  },
  {
    userId: '2',
    message: 'I think Trump will make a great president.',
  },
  {
    userId: '2',
    message: 'Trump sets a good example for upcoming entrepreneurs.',
  },
];

let responseIndex = -1;

export const ChatsContext = createContext<ChatsProps | null>(null);

const appendChat = ([setChats]: [SetChats]) => async (newChat: Chat) => {
  setChats((chats) => [...chats, newChat]);

  await sleep(3000);

  if (responseIndex < responseChats.length - 1) {
    setChats((chats) => [...chats, responseChats[responseIndex]]);
    responseIndex++;
  }
}

export const ChatsProvider = (props: any) => {
  const [chats, setChats] = useState<Chats>([
    {
      userId: '2',
      message: 'I think Trump is a brilliant individual.',
    },
    {
      userId: '1',
      message: 'I think Trump is only fairly decent in business.',
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