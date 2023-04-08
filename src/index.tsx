import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ChatProvider} from './[2]pages/visualizer/contexts/chat';
import {OpinionsProvider} from './[2]pages/visualizer/contexts/opinions';
import {ScreenProvider} from './[2]pages/visualizer/contexts/screen';
import {Device} from './[2]pages/visualizer/views/device';
import {SessionProvider} from "./[2]pages/visualizer/contexts/session";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <div className='bg-gray-800 h-full w-full'>
            <SessionProvider>
                <OpinionsProvider>
                    <ChatProvider>
                        <ScreenProvider>
                            <Device/>
                        </ScreenProvider>
                    </ChatProvider>
                </OpinionsProvider>
            </SessionProvider>
        </div>
    </React.StrictMode>
);