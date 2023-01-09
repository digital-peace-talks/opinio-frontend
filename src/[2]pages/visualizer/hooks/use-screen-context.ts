import { useContext } from 'react';
import { ScreenContext } from '../contexts/screen';

export const useScreenContext = () => {
  const context = useContext(ScreenContext);

  if (!context) 
    throw new Error("useScreenContext requires a ScreenProvider!");

  return context;
};