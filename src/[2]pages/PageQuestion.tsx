import {useOpinionsContext} from "./radar/hooks/use-opinions-context";
import {useLocation} from 'react-router-dom'
import {useEffect, useState} from "react";

export const PageQuestion = () => {
    const navigation = useLocation()
    const {currentOpinion} = useOpinionsContext()
    const [truncate, setTruncate] = useState(false)

    const isChat = navigation.pathname.includes('/chat')

    useEffect(() => {
        setTruncate(currentOpinion?.opinion?.length > 250)
    }, [currentOpinion?.opinion, isChat])

    const text = truncate ? currentOpinion?.opinion?.substring(0, 250) : currentOpinion?.opinion
    return (
        <div
            className='flex justify-center items-center box-content text-center text-white text-sm md:text-lg'
            style={{
                fontFamily: 'Lufga-Regular',
                padding: `10px 30px`,
                backgroundImage: 'linear-gradient(to right, black, #0702a1, black)'
            }}>
            <p className='inline'>
                {isChat ? text : 'What should be done about climate change?'}
                {isChat && truncate &&
                  <span className='inline cursor-pointer' onClick={() => setTruncate(false)}>...</span>}
            </p>
        </div>
    );
}