import {memo} from 'react';
import {Screen} from '../contexts/screen';
import {useScreenContext} from '../hooks/use-screen-context';
import {ChatScreen} from './chat';
import {RadarScreen} from './page';
import {PageQuestion} from './page-question';
import {PageTitle} from './page-title';

export const Device = memo(() => {
    const {screen} = useScreenContext();

    return (
        <div className='flex flex-col h-full bg-black'>
            {/* <div className='bg-gray-800 text-gray-300 text-center p-5'><p>{username}</p></div> */}
            <PageTitle height={60}/>
            <PageQuestion height={30}/>
            <div className='w-full flex-1'>
                {[Screen.Radar].includes(screen) &&
                  <RadarScreen/>}
                {[Screen.Chat].includes(screen) &&
                  <ChatScreen/>}
            </div>
        </div>
    );
});