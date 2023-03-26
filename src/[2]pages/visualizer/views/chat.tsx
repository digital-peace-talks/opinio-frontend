import {memo, useEffect, useRef, useState} from 'react';
import {useChatContext} from '../hooks/use-chat-context';
import {ReactComponent as SendSvg} from '../assets/paper-plane.svg';
import {ReactComponent as BackSvg} from '../assets/left-arrow.svg';
import {useDebouncedCallback} from '../../../[1]shared/hooks/use-debounce';
import {Screen} from '../contexts/screen';
import {useScreenContext} from '../hooks/use-screen-context';
import {useOpinionsContext} from "../hooks/use-opinions-context";


export const ChatScreen = memo(() => {
    const {chatIndex, opinion, messages} = useChatContext();
    const {currentOpinion} = useOpinionsContext()

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='flex justify-center items-center p-2'>
                <p className='text-white text-center'>
                    Chat with Opinion #{chatIndex}:<br/>
                    {opinion}
                </p>
            </div>
            <div className='flex flex-1'>
                <DisagreementSlider/>
                <div className='flex flex-1 flex-col gap-6 p-6 bg-gray-800 overflow-x-hidden overflow-y-auto'>
                    {messages && messages.map((message) => {
                        const isUser = message.opinionId === currentOpinion.id;

                        const padding = isUser ? 'pl-10' : 'pr-10';
                        const margin = isUser ? 'ml-auto' : 'mr-auto';
                        const bgColor = isUser ? 'bg-gray-600' : 'bg-gray-700';

                        return (
                            <div className={`flex shrink-0 ${margin} ${padding}`}>
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
    const {setScreen} = useScreenContext();
    const {currentOpinion} = useOpinionsContext()

    const [input, setInput] = useState<string>('');
    const readOnlyRef = useRef<boolean>(false);
    const {appendMessages} = useChatContext();

    return (
        <div className='flex bg-gray-800 w-full h-[58px] border-t border-gray-500'>
            <div
                className='flex justify-center items-center w-16 h-full'
                onClick={() => setScreen(Screen.Radar)}>
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
                                opinionId: currentOpinion.id,
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
    );
}

const DisagreementSlider = () => {
    const {disagreement, setDisagreement, respect} = useChatContext();
    const {updateOpinion} = useOpinionsContext()
    const [value, setValue] = useState<number>(disagreement);
    const [mounted, setMounted] = useState<boolean>(false);

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
            updateOpinion(respect, disagreementValue);
        },
        ms: 200,
    }, []);

    return (
        <div
            className='relative'
            style={{backgroundImage: 'linear-gradient(to top, gray, #2c023d)'}}>
            <p className={`absolute rotate top-52 -left-12 text-white select-none`}>DISAGREEMENT</p>
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
    const {respect, setRespect, disagreement} = useChatContext();
    const {updateOpinion} = useOpinionsContext()
    const [value, setValue] = useState<number>(respect);
    const [mounted, setMounted] = useState<boolean>(false);

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
            updateOpinion(respectValue, disagreement);
        },
        ms: 200,
    }, []);

    return (
        <div
            className='relative'
            style={{backgroundImage: 'linear-gradient(to top, #5a0012, #ff6c00, #00ff5e)'}}>
            <p className={`absolute rotate top-52 left-1.5 text-white select-none`}>RESPECT</p>
            <input
                type='range'
                min={-5}
                max={5}
                step={0.1}
                value={!mounted ? value : undefined}
                // @ts-ignore
                orient='vertical'
                className='flex flex-col w-12 h-full bg-blue-500 border-x relative hover:cursor-grab'
                style={{WebkitAppearance: 'slider-vertical'}}
                onChange={debouncedValueChange}/>
        </div>
    );
}