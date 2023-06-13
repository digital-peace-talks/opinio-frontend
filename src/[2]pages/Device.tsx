import {memo} from 'react';
import {ChatScreen} from '[2]pages/chat/views/ChatScreen';
import {RadarScreen} from '[2]pages/radar/views/RadarScreen';
import {PageQuestion} from '[2]pages/PageQuestion';
import {PageTitle} from '[2]pages/PageTitle';

import {Routes, Route} from 'react-router-dom';

export const Device = memo(() => {

    return (
        <div className='flex flex-col h-full bg-black'>
            {/* <div className='bg-gray-800 text-gray-300 text-center p-5'><p>{username}</p></div> */}
            <PageTitle height={60}/>
            <PageQuestion/>
            <div className='w-full flex-1'>
                <Routes>
                    <Route path="/" element={<RadarScreen/>}/>
                    <Route path="/chat/:id" element={<ChatScreen/>}/>
                </Routes>
            </div>
        </div>
    );
});