import { memo } from 'react';
import { useChatsContext } from '../hooks/use-chats-context';

interface Props {
  userId: string;
}

export const ChatScreen = memo((props: Props) => {
  const { userId } = props;

  const { chats, appendChats } = useChatsContext();

  return (
    <div className='flex w-full h-full'>
      <div className='w-12 h-full bg-blue-500 border-x' />
        <div className='flex flex-col bg-gray-800 w-full h-full p-8 gap-5'>
          {chats && chats.map((chat) => {
            const isUser = chat.userId === userId;

            const outerMargin = isUser ? 'ml-10': 'mr-10';

            const innerMargin = isUser ? 'ml-auto' : 'mr-auto';

            const bgColor = isUser ? 'bg-gray-600' : 'bg-gray-700';

            return (
              <div className={`flex ${outerMargin}`}>
                <div className={`rounded-md ${innerMargin} p-5 ${bgColor} text-white`}>
                  {<p>{chat.message}</p>}
                </div>
              </div>
            );
          })}
        </div>
      <div className='w-12 h-full bg-green-500 border-x'/>
    </div> 
  )
});