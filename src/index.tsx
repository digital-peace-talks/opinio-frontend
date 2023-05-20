import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ChatProvider} from '[2]pages/chat/contexts/chat';
import {OpinionsProvider} from '[2]pages/radar/contexts/opinions';
import {SessionProvider} from "[2]pages/radar/contexts/session";
import {Device} from '[2]pages/Device';
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