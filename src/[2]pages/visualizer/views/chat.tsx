import { memo, useState } from 'react';
import { useChatsContext } from '../hooks/use-chats-context';
import { ReactComponent as SendSvg } from '../assets/paper-plane.svg';

interface Props {
  userId: string;
}

export const ChatScreen = memo((props: Props) => {
  const { userId } = props;

  const { chats } = useChatsContext();

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex flex-1'>
        <div className='w-12 bg-blue-500 border-x' />
        <div className='flex flex-1 flex-col gap-6 p-6 bg-gray-800 overflow-x-hidden overflow-y-auto'>
          {chats && chats.map((chat) => {
            const isUser = chat.userId === userId;

            const padding = isUser ? 'pl-10': 'pr-10';
            const margin = isUser ? 'ml-auto' : 'mr-auto';
            const bgColor = isUser ? 'bg-gray-600' : 'bg-gray-700';

            console.log(chat.message);

            return (
              <div className={`flex shrink-0 ${margin} ${padding}`}>
                <div className={`rounded-md ${bgColor} p-3 text-white`}>
                  {<p className='whitespace-pre-wrap'>{chat.message}</p>}
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-12 bg-green-500 border-x'/>
      </div>
      <MessageBox userId={userId} />
    </div>
  )
});

export const MessageBox = (props: { userId: string }) => {
  const { userId } = props;
  
  const [input, setInput] = useState<string>('');
  const { appendChat } = useChatsContext();

  return (
    <div className='flex bg-gray-800 w-full h-14 border-t border-gray-500'>
      <div className='w-16 h-full'></div>
      <div className='w-full pt-2'>    
        <div className='bg-gray-700 w-full h-10 rounded'>
          <textarea
            className='bg-gray-700 w-full h-full rounded px-5 pt-2 text-white'
            value={input}
            onChange={(e) => setInput(e.target.value)}/>
        </div>
      </div>
      <div className='flex justify-center items-center w-16 h-full'>
        <button
          className='flex justify-center items-center border rounded border-gray-800 focus:border-gray-500 w-10 h-10'
          onClick={() => {
            if (input) {
              appendChat({
                userId,
                message: input,
              });
              setInput('');
            }
          }}>
          <SendSvg width={24} height={24} fill='white' className='-rotate-45 pb-1' />
        </button>
      </div>
    </div>
  );
}
