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
    <div className='bg-gray-800 h-full w-full'>
        <OpinionsProvider>
          <ChatsProvider>
            <div className='flex w-full h-full p-5 gap-5'>
              <Device username='Username A' userId='1'/>
              <Device username='Username B' userId='2'/>
            </div>
          </ChatsProvider>
        </OpinionsProvider>
    </div>   
  </React.StrictMode>
);