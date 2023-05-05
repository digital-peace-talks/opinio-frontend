import {memo} from 'react';
import {ChatScreen} from './chat';
import {RadarScreen} from './page';
import {PageQuestion} from './page-question';
import {PageTitle} from './page-title';

import {Routes, Route} from 'react-router-dom';

export const Device = memo(() => {

    return (
        <div className='flex flex-col h-full bg-black'>
            {/* <div className='bg-gray-800 text-gray-300 text-center p-5'><p>{username}</p></div> */}
            <PageTitle height={60}/>
            <PageQuestion height={30}/>
            <div className='w-full flex-1'>
                <Routes>
                    <Route path="/" element={<RadarScreen/>}/>
                    <Route path="/chat/:id" element={<ChatScreen/>}/>
                </Routes>
            </div>
        </div>
    );
});