import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ChatProvider} from './[2]pages/visualizer/contexts/chat';
import {OpinionsProvider} from './[2]pages/visualizer/contexts/opinions';
import {Device} from './[2]pages/visualizer/views/device';
import {SessionProvider} from "./[2]pages/visualizer/contexts/session";
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <div className='bg-gray-800 h-full w-full'>
            <SessionProvider>
                <OpinionsProvider>
                    <ChatProvider>
                        <Device/>
                    </ChatProvider>
                </OpinionsProvider>
            </SessionProvider>
        </div>
    </BrowserRouter>
);