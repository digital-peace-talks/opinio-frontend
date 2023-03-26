import {memo} from 'react';
import {PageBody} from './page-body';


export const RadarScreen = memo(() => {

    return (
        <div className='flex flex-col w-full h-full justify-start bg-black'>
            <PageBody height={400}/>
        </div>
    );
});
