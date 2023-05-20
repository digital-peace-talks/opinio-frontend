import {memo} from 'react';
import {RadarBody} from '[2]pages/radar/views/components/RadarBody';


export const RadarScreen = memo(() => {

    return (
        <div className='flex flex-col w-full h-full justify-start bg-black'>
            <RadarBody height={400}/>
        </div>
    );
});
