import {memo} from 'react';
import {RadarBody} from '[2]pages/radar/views/components/RadarBody';
import {useWindowDimensions} from "../../../[1]shared/hooks/use-window-dimensions";


export const RadarScreen = memo(() => {

    const {min} = useWindowDimensions()

    return (
        <div className='flex flex-col w-full h-full justify-start bg-black'>
            <RadarBody height={min / (min < 700 ? 1.2 : 1.5)}/>
        </div>
    );
});
