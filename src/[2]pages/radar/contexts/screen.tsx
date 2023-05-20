import React, { createContext, useMemo, useState } from 'react';

export enum Screen {
  Radar = 'Radar',
  Chat = 'Chat',
}

interface ScreenProps {
  screen: Screen;
  setScreen: React.Dispatch<React.SetStateAction<Screen>>;
}

export const ScreenContext = createContext<ScreenProps | null>(null);

export const ScreenProvider = (props: any) => {
  const [screen, setScreen] = useState<Screen>(Screen.Radar);

  const value = useMemo(
    () => ({
      screen,
      setScreen,
    }),
    [screen]
  );

  return <ScreenContext.Provider value={value} {...props} />;
};