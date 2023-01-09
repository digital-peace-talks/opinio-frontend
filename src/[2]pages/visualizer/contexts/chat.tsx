import React, { createContext, useMemo, useState } from 'react';
import { sleep } from '../../../[1]shared/util/sleep';

interface Message {
  opinionId: string;
  message: string;
}

type Messages = Message[];
type SetTrigger = React.Dispatch<React.SetStateAction<boolean>>;
type SetDisagreement = React.Dispatch<React.SetStateAction<number>>;
type SetRespect = SetDisagreement;

interface ChatProps {
  chatIndex: number;
  setChatIndex: (index: number) => any;
  opinion: string;
  disagreement: number;
  respect: number;
  messages: Messages;
  setDisagreement: SetDisagreement;
  setRespect: SetRespect;
  appendMessages: (message: Message) => any;
}

const opinionsArray = [
  'Trump is a brilliant and innovative individual.',
  'Trump benefited from the media.',
  'Trump was born into a wealthy country at a great time with a lot of opportunity.',
  'Trump doesn\'t know how to run a country.',
  'Trump is truly a genius.',
];

const messagesArray: Messages[] = [
  [
    {
      opinionId: '1',
      message: 'I think Trump is only fairly decent in business.',
    },
  ],
  [
    {
      opinionId: '1',
      message: 'He definitely attracts a lot of attention.',
    },
  ],
  [
    {
      opinionId: '1',
      message: 'I agree. Trump is just lucky.',
    },
  ],
  [
    {
      opinionId: '1',
      message: 'I think the "wall" he had built is quite useful for regulating emigration.',
    },
  ],
  [
    {
      opinionId: '1',
      message: 'Do you think Trump is a genius?',
    },
  ],

];

const responseMessagesArray: Messages[] = [
  [
    {
      opinionId: '2',
      message: 'Trump has proven his success in business. He built his own successfull hotel.',
    },
    {
      opinionId: '2',
      message: 'I think Trump showed innovation as a president.',
    },
    {
      opinionId: '2',
      message: 'Trump sets a good example for upcoming entrepreneurs.',
    },
  ],
  [
    {
      opinionId: '3',
      message: 'Trump is quite the entertaining fellow.',
    },
    {
      opinionId: '3',
      message: 'I enjoyed watching him in the Trump Tower series.',
    },
    {
      opinionId: '3',
      message: 'I think he wouldn\'t be the same without the media.',
    },
  ],
  [
    {
      opinionId: '4',
      message: 'Exactly. He knew the right people and his father already made a name for himself.',
    },
    {
      opinionId: '4',
      message: 'Not to mention, the Trump hotel was terribly furnished to save on costs.',
    },
    {
      opinionId: '4',
      message: 'He used the media to developer an image of success around himself.',
    },
  ],
  [
    {
      opinionId: '5',
      message: 'Trump hasn\'t contributed much besides the "wall".',
    },
    {
      opinionId: '5',
      message: 'The "wall" is good for those in the USA, but plain suffering to those in Mexico with family members in the USA.',
    },
    {
      opinionId: '5',
      message: 'Trump makes bold moves, but these moves aren\'t necessarily fo the greater good.',
    },
  ],
  [
    {
      opinionId: '6',
      message: 'Yes, I think Trump is a genius.',
    },
    {
      opinionId: '6',
      message: 'He singlehandedly built an empire.',
    },
    {
      opinionId: '6',
      message: 'What do you think is the reason for his success then?',
    },
  ]
];

const disagreementArray = [
  5,
  5,
  5,
  5,
  5,
];

const respectArray = [
  0,
  0,
  0,
  0,
  0,
];

let responseIndexArray = [
  0,
  0,
  0,
  0,
  0,
]

export const ChatContext = createContext<ChatProps | null>(null);

const setDisagreement = ([chatIndex, setTrigger]: [number, SetTrigger]) =>
(disagreement: number) => {
  disagreementArray[chatIndex] = disagreement;

  setTrigger((trigger) => !trigger);
}

const setRespect = ([chatIndex, setTrigger]: [number, SetTrigger]) =>
(respect: number) => {
  respectArray[chatIndex] = respect;

  setTrigger((trigger) => !trigger);
}

const appendMessages = ([chatIndex, setTrigger]: [number, SetTrigger]) => async (message: Message) => {
  messagesArray[chatIndex].push(message);
  setTrigger((trigger) => !trigger);

  if (responseIndexArray[chatIndex] < responseMessagesArray[chatIndex].length) {
    await sleep(1500);

    messagesArray[chatIndex].push(responseMessagesArray[chatIndex][responseIndexArray[chatIndex]]);
    responseIndexArray[chatIndex]++;
    setTrigger((trigger) => !trigger);
  }
}

export const ChatProvider = (props: any) => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [chatIndex, setChatIndex] = useState<number>(0);

  const value = useMemo(
    () => ({
      chatIndex,
      setChatIndex,
      opinion: opinionsArray[chatIndex],
      disagreement: disagreementArray[chatIndex],
      respect: respectArray[chatIndex],
      messages: messagesArray[chatIndex],
      setDisagreement: setDisagreement([chatIndex, setTrigger]),
      setRespect: setRespect([chatIndex, setTrigger]),
      appendMessages: appendMessages([chatIndex, setTrigger]),
    }),
    [trigger, chatIndex]
  );

  return <ChatContext.Provider value={value} {...props} />;
};