import {useContext} from 'react';
import {SessionContext} from "../contexts/session";

export const useSessionContext = () => {
    const context = useContext(SessionContext);

    if (!context)
        throw new Error("useSessionContext requires a ScreenProvider!");

    return context;
};
