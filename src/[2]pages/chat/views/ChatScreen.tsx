import {memo, useEffect, useRef, useState} from 'react';
import {useChatContext} from '../hooks/use-chat-context';
import {ReactComponent as SendSvg} from '[2]pages/chat/assets/paper-plane.svg';
import {ReactComponent as BackSvg} from '[2]pages/chat/assets/left-arrow.svg';
import {ReactComponent as StarSvg} from '[2]pages/chat/assets/star.svg';
import {useDebouncedCallback} from '[1]shared/hooks/use-debounce';
import {useOpinionsContext} from "[2]pages/radar/hooks/use-opinions-context";
import {useParams, useNavigate} from 'react-router-dom'
import {filterOpinion} from "[1]shared/util/filter-opinion";


export const ChatScreen = memo(() => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {chatIndex, opinion, messages, setChatIndex} = useChatContext();
    const {opinions, currentOpinion, setCurrentOpinion} = useOpinionsContext()

    useEffect(() => {
        if (id === undefined || !opinions) return navigate('/')
        setChatIndex(+id)
        setCurrentOpinion(filterOpinion(opinions, +id) || null)
    }, [currentOpinion, id, navigate, opinions, setChatIndex, setCurrentOpinion])

    return (
        <div className='flex flex-col w-full h-full max-w-2xl mx-auto'>
            <div className='flex justify-center items-center p-2'>
                <p className='text-white text-center'>
                    Chat with Opinion #{chatIndex}:<br/>
                    {opinion}
                </p>
            </div>
            <div className='flex flex-1'>
                <DisagreementSlider/>
                <div className='flex flex-1 flex-col gap-6 p-6 bg-gray-800 overflow-x-hidden overflow-y-auto'>
                    {messages && messages.map((message, index) => {
                        const isUser = message.opinionId === currentOpinion?.id;

                        const padding = isUser ? 'pl-10' : 'pr-10';
                        const margin = isUser ? 'ml-auto' : 'mr-auto';
                        const bgColor = isUser ? 'bg-gray-600' : 'bg-gray-700';

                        return (
                            <div className={`flex shrink-0 ${margin} ${padding}`}
                                 key={message?.opinionId + '-' + index}>
                                <div className={`rounded-md ${bgColor} p-3 text-white`}>
                                    {<p className='whitespace-pre-wrap'>{message.message}</p>}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <RespectSlider/>
            </div>
            <MessageBox/>
        </div>
    )
});

const MessageBox = () => {
    const navigate = useNavigate()
    const {currentOpinion} = useOpinionsContext()

    const [input, setInput] = useState<string>('');
    const readOnlyRef = useRef<boolean>(false);
    const {appendMessages} = useChatContext();

    return (
        <div className='flex flex-col items-center w-full h-auto bg-gray-800 relative overflow-visible'>
            <div
                className='text-white mb-2 px-3 py-1.5 border border-gray-200 rounded-md absolute bottom-full left-1/2 -translate-x-1/2 text-md font-bold cursor-pointer flex items-center justify-center gap-2 group opacity-90 hover:opacity-100 transition-all duration-300'
                onClick={() => navigate('/')}>
                <StarSvg className='w-4 h-4 text-transparent group-hover:text-white transition-all  duration-300'/>
                <p>Submit Rating</p>
            </div>
            <div className='flex bg-gray-800 w-full h-[58px] border-t border-gray-500'>
                <div
                    className='flex justify-center items-center w-16 h-full'
                    onClick={() => navigate('/')}>
                    <BackSvg width={16} height={16} fill='white'/>
                </div>
                <div className='w-full h-full pt-2'>
                    <div className='bg-gray-700 w-full h-[40px] rounded'>
          <textarea
              readOnly={readOnlyRef.current}
              className='bg-gray-700 w-full h-full rounded px-5 pt-2 text-white'
              value={input}
              onChange={(e) => setInput(e.target.value)}/>
                    </div>
                </div>
                <div className='flex justify-center items-center w-16 h-full'>
                    <button
                        disabled={readOnlyRef.current}
                        className='flex justify-center items-center border rounded border-gray-800 w-10 h-10'
                        onClick={async () => {
                            if (input) {
                                readOnlyRef.current = true;
                                setInput('. . .');

                                await appendMessages({
                                    opinionId: currentOpinion?.id,
                                    message: input,
                                });

                                readOnlyRef.current = false;
                                setInput('');
                            }
                        }}>
                        <SendSvg width={24} height={24} fill='white' className='-rotate-45 pb-1'/>
                    </button>
                </div>
            </div>
        </div>
    );
}

const DisagreementSlider = () => {
    const {disagreement, setDisagreement, respect, chatIndex} = useChatContext();
    const {updateOpinion, currentOpinion} = useOpinionsContext()
    const [value, setValue] = useState<number>(disagreement);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(false)
        setValue(disagreement)
    }, [chatIndex, disagreement])

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    const debouncedValueChange = useDebouncedCallback({
        fn: (e: React.ChangeEvent<HTMLInputElement>) => {
            const disagreementValue = Number(e.target.value)
            setDisagreement(disagreementValue);
            setValue(disagreementValue);
            updateOpinion(respect, disagreementValue, currentOpinion);
        },
        ms: 200,
    }, []);

    return (
        <div
            className='relative'
            style={{backgroundImage: 'linear-gradient(to top, gray, #2c023d)'}}>
            <p className={`absolute -rotate-90 top-1/2 -translate-y-1/2 -left-12 text-white select-none`}>DISAGREEMENT</p>
            <input
                type='range'
                min={0}
                max={10}
                step={0.1}
                value={!mounted ? value : undefined}
                // @ts-ignore
                // orient='vertical'
                className='flex flex-col w-12 h-full bg-blue-500 border-x relative hover:cursor-grab'
                style={{WebkitAppearance: 'slider-vertical'}}
                onChange={debouncedValueChange}/>
        </div>
    );
}

const RespectSlider = () => {
    const {respect, setRespect, disagreement, chatIndex} = useChatContext();
    const {updateOpinion, currentOpinion} = useOpinionsContext()
    const [value, setValue] = useState<number>(respect);
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(false)
        setValue(respect)
    }, [chatIndex, respect])

    useEffect(() => {
        if (!mounted) {
            setMounted(true);
        }
    }, [mounted]);

    const debouncedValueChange = useDebouncedCallback({
        fn: (e: React.ChangeEvent<HTMLInputElement>) => {
            const respectValue = Number(e.target.value)
            setValue(respectValue);
            setRespect(respectValue);
            updateOpinion(respectValue, disagreement, currentOpinion);
        },
        ms: 200,
    }, []);

    return (
        <div
            className='relative'
            style={{backgroundImage: 'linear-gradient(to top, #5a0012, #ff6c00, #00ff5e)'}}>
            <p className={`absolute -rotate-90 top-1/2 -translate-y-1/2 left-[0.35rem] text-white select-none`}>Empathy</p>
            <input
                type='range'
                min={-5}
                max={5}
                step={0.1}
                value={!mounted ? value : undefined}
                // @ts-ignore
                // orient='vertical'
                className='flex flex-col w-12 h-full bg-blue-500 border-x relative hover:cursor-grab'
                style={{WebkitAppearance: 'slider-vertical'}}
                onChange={debouncedValueChange}/>
        </div>
    );
}