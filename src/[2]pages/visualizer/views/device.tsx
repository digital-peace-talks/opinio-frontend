import { memo, useState } from 'react';
import { ChatScreen } from './chat';
import { RadarScreen } from './page';
import { PageQuestion } from './page-question';
import { PageTitle } from './page-title';

enum View {
  Radar = 'Radar',
  Chat = 'Chat',
}

interface Props {
  username: string;
  userId: string;
}

type SetView = React.Dispatch<React.SetStateAction<View>>;

const onButtonClick = ([view, setView]: [View, SetView]) => (
) => {
  if (view === View.Radar) {
    setView(View.Chat);
  } else if (view === View.Chat) {
    setView(View.Radar);
  }
} 

export const Device = memo((props: Props) => {
  const { username, userId } = props;

  const [view, setView] = useState<View>(View.Radar);

  const buttonContent = view === View.Radar ? 'Chat' : 'Radar';

  return (
    <div className='flex flex-col w-1/2 h-full bg-black'>
      <div className='bg-gray-800 text-gray-300 text-center p-5'><p>{username}</p></div>
      <PageTitle height={60}/>
      <PageQuestion height={30}/>
      <div className='w-full flex-1'>
        {[View.Radar].includes(view) &&
          <RadarScreen userId={userId}/>}
        {[View.Chat].includes(view) &&
          <ChatScreen userId={userId}/>}
      </div>
      <div className='bg-white h-16'>
        <button
          className='w-24 h-full flex justify-center items-center'
          onClick={() => onButtonClick([view, setView])()}>
          <p>{buttonContent}</p>
        </button>
      </div>
    </div>
  );
});