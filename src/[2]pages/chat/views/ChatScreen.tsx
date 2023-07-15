/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useRef, useState } from 'react';
import { useChatContext } from '../hooks/use-chat-context';
import { ReactComponent as SendSvg } from '[2]pages/chat/assets/paper-plane.svg';
import { ReactComponent as BackSvg } from '[2]pages/chat/assets/left-arrow.svg';
import { ReactComponent as StarSvg } from '[2]pages/chat/assets/star.svg';
import { useDebouncedCallback } from '[1]shared/hooks/use-debounce';
import { useOpinionsContext } from '[2]pages/radar/hooks/use-opinions-context';
import { useParams, useNavigate } from 'react-router-dom';
import { filterOpinion } from '[1]shared/util/filter-opinion';

export const ChatScreen = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { chatIndex, opinion, messages, setChatIndex } = useChatContext();
  const { opinions, currentOpinion, setCurrentOpinion } = useOpinionsContext();

    console.log("Messages", messages)

  useEffect(() => {
    if (id === undefined || !opinions) return navigate('/');
    setChatIndex(+id);
    setCurrentOpinion(filterOpinion(opinions, +id) || null);
  }, [currentOpinion, id, navigate, opinions, setChatIndex, setCurrentOpinion]);

  return (
    <div className="my-[30px] flex w-full   relative">
      <div
        className="text-white flex gap-1 item-center pl-5 absolute cursor-pointer"
        onClick={() => navigate('/')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_27_1780)">
            <path
              d="M5 12H19"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 12L9 16"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 12L9 8"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_27_1780">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p> Go back</p>
      </div>
      <div className="flex flex-col w-[490px]  max-w-2xl mx-auto ">
        <div className="flex justify-center items-center p-2">
          <p className="text-white text-center">
            Opinion #{chatIndex}
            <br />
          </p>
        </div>
        <div className="text-white text-2xl font-normal my-7">
          <p className="text-white text-left">
            {/* {opinion} */}
            People that can afford it should make donations. The others should
            read Drawdown, edited by Paul Hawken, on the 100 best ideas for
            combating Global Warming.
          </p>
        </div>
        <div className="text-white mb-3">
          <p>Rate the chat</p>
        </div>
        <div className="flex flex-1">
          <DisagreementSlider />
          <div
            className=" h-[380px] flex flex-1 flex-col gap-6 p-6 mx-4  overflow-x-hidden overflow-y-auto text-white rounded-md  "
            style={{
              border: '2px solid rgba(128, 128, 128, 1)',
              background: 'rgba(255, 255, 255, 0.10)',
            }}
          >
            {messages &&
              messages.map((message, index) => {
                const isUser = message.opinionId === currentOpinion?.id;

                // const padding = isUser ? 'pl-10' : 'pr-10';
                // const margin = isUser ? 'ml-auto' : 'mr-auto';
                // const bgColor = isUser ? 'bg-gray-600' : 'bg-gray-700';

                return (
                  <div
                    // className={`flex shrink-0 ${margin} ${padding}`}
                    className={`flex shrink-0 p-4`}
                    key={message?.opinionId + '-' + index}
                  >
                    <div className={`rounded-md  p-3 text-white`}>
                      {<p className="whitespace-pre-wrap">{message.message}</p>}
                    </div>
                  </div>
                );
              })}
          </div>
          <RespectSlider />
        </div>
        <MessageBox />
      </div>
    </div>
  );
});

const MessageBox = () => {
  const navigate = useNavigate();
  const { currentOpinion } = useOpinionsContext();

  const [input, setInput] = useState<string>('');
  const readOnlyRef = useRef<boolean>(false);
  const { appendMessages } = useChatContext();

  return (
    <div className="flex flex-col items-center w-full h-auto  relative overflow-visible">
      <div className="flex w-full justify-between gap-2  my-6">
        {/* <div
          className="flex justify-center items-center w-16 h-full"
          onClick={() => navigate('/')}
        >
          <BackSvg width={16} height={16} fill="white" />
        </div> */}
        {/* <div className="w-full h-full pt-2"> */}
        <div
          className=" w-full  rounded flex justify-center items-start p-3 "
          style={{
            border: '2px solid rgba(128, 128, 128, 1)',
            background: 'rgba(255, 255, 255, 0.10)',
          }}
        >
          {/* <textarea
              readOnly={readOnlyRef.current}
              className="bg-gray-700 w-full h-full rounded px-5 pt-2 text-white"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            /> */}
          <input
            type="text"
            readOnly={readOnlyRef.current}
            className=" w-full h-[21px]  rounded text-base  bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              color: 'rgba(218, 218, 218, 1)',
            }}
          />
        </div>
        {/* </div> */}
        <div className="flex justify-center items-center w-[48.2px] h-full bg-white rounded-md">
          <button
            disabled={readOnlyRef.current}
            className="flex justify-center items-center text-black   w-10 h-10 py-3"
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
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 25 25"
              fill="none"
            >
              <g clip-path="url(#clip0_44_479)">
                <path
                  d="M10.5 14.5L21.5 3.5"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21.5001 3.5L15.0001 21.5C14.9562 21.5957 14.8858 21.6769 14.7971 21.7338C14.7085 21.7906 14.6054 21.8209 14.5001 21.8209C14.3948 21.8209 14.2917 21.7906 14.203 21.7338C14.1144 21.6769 14.0439 21.5957 14.0001 21.5L10.5001 14.5L3.50007 11C3.40433 10.9561 3.3232 10.8857 3.26632 10.7971C3.20944 10.7084 3.1792 10.6053 3.1792 10.5C3.1792 10.3947 3.20944 10.2916 3.26632 10.2029C3.3232 10.1143 3.40433 10.0439 3.50007 10L21.5001 3.5Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_44_479">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div
        className=" w-full text-black mb-2 px-3 py-3 rounded-md  text-md font-medium cursor-pointer flex items-center justify-center "
        style={{
          border: '1px dashed rgba(0, 0, 0, 0.80)',
          background: ' #FFF',
        }}
        onClick={() => navigate('/')}
      >
        <p>Submit Rating</p>
      </div>
      <div className='flex justify-center items-center gap-2 text-white text-sm font-normal mt-4'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <g clip-path="url(#clip0_27_1773)">
            <path
              d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 9.01509 17.306 8.03982 16.9291 7.12987C16.5522 6.21993 15.9997 5.39314 15.3033 4.6967C14.6069 4.00026 13.7801 3.44781 12.8701 3.0709C11.9602 2.69399 10.9849 2.5 10 2.5C9.01509 2.5 8.03982 2.69399 7.12987 3.0709C6.21993 3.44781 5.39314 4.00026 4.6967 4.6967C4.00026 5.39314 3.44781 6.21993 3.0709 7.12987C2.69399 8.03982 2.5 9.01509 2.5 10Z"
              stroke="#DADADA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10 14.1666V14.175"
              stroke="#DADADA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.99992 11.25C9.98458 10.9795 10.0575 10.7113 10.2078 10.4858C10.3581 10.2604 10.5776 10.0899 10.8333 9.99998C11.1465 9.88019 11.4276 9.68934 11.6546 9.44244C11.8815 9.19554 12.048 8.89933 12.141 8.57713C12.234 8.25494 12.251 7.91555 12.1905 7.5857C12.1301 7.25584 11.9939 6.94452 11.7927 6.67624C11.5915 6.40796 11.3307 6.19005 11.031 6.03966C10.7313 5.88927 10.4007 5.81051 10.0654 5.80958C9.73001 5.80865 9.39902 5.88557 9.09846 6.0343C8.79789 6.18302 8.53595 6.39948 8.33325 6.66664"
              stroke="#DADADA"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_27_1773">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className='text-base'>
          Ratings will be continously accounted for in the actual product. Hence
          submission button won’t be needed any more.
        </p>
      </div>
    </div>
  );
};

const DisagreementSlider = () => {
  const { disagreement, setDisagreement, respect, chatIndex } =
    useChatContext();
  const { updateOpinion, currentOpinion } = useOpinionsContext();
  const [value, setValue] = useState<number>(disagreement);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(false);
    setValue(disagreement);
  }, [chatIndex, disagreement]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  const debouncedValueChange = useDebouncedCallback(
    {
      fn: (e: React.ChangeEvent<HTMLInputElement>) => {
        const disagreementValue = Number(e.target.value);
        setDisagreement(disagreementValue);
        setValue(disagreementValue);
        updateOpinion(respect, disagreementValue, currentOpinion);
      },
      ms: 200,
    },
    []
  );

  return (
    <div
      className="relative"
      style={{ backgroundImage: 'linear-gradient(to top, gray, #2c023d)' }}
    >
      <p
        className={`absolute -rotate-90 top-1/2 -translate-y-1/2 -left-12 text-white select-none`}
      >
        DISAGREEMENT
      </p>
      <input
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={!mounted ? value : undefined}
        // @ts-ignore
        // orient='vertical'
        className="flex flex-col w-12 h-full bg-blue-500 border-x relative hover:cursor-grab"
        style={{ WebkitAppearance: 'slider-vertical' }}
        onChange={debouncedValueChange}
      />
    </div>
  );
};

const RespectSlider = () => {
  const { respect, setRespect, disagreement, chatIndex } = useChatContext();
  const { updateOpinion, currentOpinion } = useOpinionsContext();
  const [value, setValue] = useState<number>(respect);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(false);
    setValue(respect);
  }, [chatIndex, respect]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  const debouncedValueChange = useDebouncedCallback(
    {
      fn: (e: React.ChangeEvent<HTMLInputElement>) => {
        const respectValue = Number(e.target.value);
        setValue(respectValue);
        setRespect(respectValue);
        updateOpinion(respectValue, disagreement, currentOpinion);
      },
      ms: 200,
    },
    []
  );

  return (
    <div
      className="relative"
      style={{
        backgroundImage: 'linear-gradient(to top, #5a0012, #ff6c00, #00ff5e)',
      }}
    >
      <p
        className={`absolute -rotate-90 top-1/2 -translate-y-1/2 left-[0.35rem] text-white select-none`}
      >
        Empathy
      </p>
      <input
        type="range"
        min={-5}
        max={5}
        step={0.1}
        value={!mounted ? value : undefined}
        // @ts-ignore
        // orient='vertical'
        className="flex flex-col w-12 h-full bg-blue-500 border-x relative hover:cursor-grab"
        style={{ WebkitAppearance: 'slider-vertical' }}
        onChange={debouncedValueChange}
      />
    </div>
  );
};
