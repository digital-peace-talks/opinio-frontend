import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Visualizer } from './[2]pages/visualizer/views/page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Visualizer/>
  </React.StrictMode>
);