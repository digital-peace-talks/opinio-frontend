import {useOpinionsContext} from "./radar/hooks/use-opinions-context";
import {useLocation} from 'react-router-dom'

export const PageQuestion = (props: { height: number }) => {
    const navigation = useLocation()
    const {height} = props;
    const {currentOpinion} = useOpinionsContext()

    const padding = 10;

    const isChat = navigation.pathname.includes('/chat')
    return (
        <div
            className='flex justify-center items-center box-content text-center text-white'
            style={{
                fontFamily: 'Lufga-Regular',
                height: height - padding,
                padding: `${padding}px`,
                backgroundImage: 'linear-gradient(to right, black, #0702a1, black)'
            }}>
            <p>
                {isChat ? currentOpinion?.opinion : 'What should be done about climate change?'}
            </p>
        </div>
    );
}