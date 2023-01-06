import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChatsProvider } from './[2]pages/visualizer/contexts/chats';
import { OpinionsProvider } from './[2]pages/visualizer/contexts/opinions';
import { Device } from './[2]pages/visualizer/views/device';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className='flex justify-center bg-gray-800 w-screen h-screen'>
        <OpinionsProvider>
          <ChatsProvider>
            <Device username='Username A' userId='1'/>
            <Device username='Username B' userId='2'/>
          </ChatsProvider>
        </OpinionsProvider>
    </div>   
  </React.StrictMode>
);