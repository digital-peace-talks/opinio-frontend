import React, {createContext, useEffect, useMemo, useState} from 'react';
import axiosInstance from "../../../[1]shared/util/axios";

export type Session = string | null

type SetSession = React.Dispatch<React.SetStateAction<Session>>;

interface SessionProps {
    session: Session;
    setSession: SetSession;
}

export const SessionContext = createContext<SessionProps | null>(null);

const getSession = ([setSession]: [SetSession]) => () => {
    axiosInstance.get('/register_session').then((response) => {
        if (response?.data?.sessionId) {
            setSession(response?.data?.sessionId)
            localStorage.setItem('opinio-session', response?.data?.sessionId)
        }
    })
}

export const SessionProvider = (props: any) => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        // const localSession = localStorage.getItem('opinio-session')
        // if (localSession) {
        //     setSession(localSession)
        //     return
        // }

        getSession([setSession])()
    }, []);

    const value = useMemo(
        () => ({
            session,
            setSession,
            getSession: getSession([setSession])
        }),
        [session]
    );

    return <SessionContext.Provider value={value} {...props} />;
};