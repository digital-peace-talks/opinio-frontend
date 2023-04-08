import React, {createContext, useEffect, useMemo, useState} from "react";
import {useSessionContext} from "../hooks/use-session-context";
import axiosInstance from "../../../[1]shared/util/axios";
import {Session} from "./session";

// --- Interfaces ---
export interface Opinion {
    connected: boolean;
    coord: { x: number, y: number }
    group: number;
    id: number;
    label: string;
    opinion: string;
}

// --- Types ---
type SetOpinions = React.Dispatch<React.SetStateAction<Opinion[] | null>>;

interface OpinionProps {
    opinions: Opinion[];
    setOpinions: SetOpinions;
    currentOpinion: Opinion;
    setCurrentOpinion: React.Dispatch<React.SetStateAction<Opinion | null>>
    getOpinions: () => void;
    advanceOpinion: (props: { id: string; advance: number }) => void;
    updateOpinion: (respect: number, dissent: number) => void;
}

// --- Context ----
export const OpinionsContext = createContext<OpinionProps | null>(null);

// ---- Logic -----

const advanceOpinion = ([setOpinions]: [SetOpinions]) =>
    (props: { id: number; advance: number }) => {
        const {id, advance} = props;

        setOpinions((opinions) => {
            if (opinions) {
                return opinions.map((opinion) => {
                    if (opinion.id === id) {
                        const {x: relX, y: relY} = opinion.coord;

                        const deltaRelX = (0.5 - relX);
                        const deltaRelY = (0.5 - relY);
                        const delta = Math.sqrt(deltaRelX ** 2 + deltaRelY ** 2);

                        const angle = Math.atan2(deltaRelY, deltaRelX);

                        const advanceX = advance * Math.cos(angle);
                        const advanceY = advance * Math.sin(angle);

                        const advanceSmaller = advance < delta;

                        const newRelX = relX + (advanceSmaller ? advanceX : deltaRelX);
                        const newRelY = relY + (advanceSmaller ? advanceY : deltaRelY);

                        return {
                            ...opinion,
                            position: {
                                relX: newRelX,
                                relY: newRelY,
                            }
                        }
                    }

                    return opinion;
                });
            }
            return opinions;
        });
    };


const getLayout: (sessionId: Session) => Promise<Opinion[]> | undefined = (sessionId: Session) => {
    if (!sessionId) return;

    return axiosInstance.get(`${sessionId}/layout`).then((response) => {
        return response.data.nodes as Opinion[]
    })
}


const updateLayout = ([setOpinions, currentOpinion]: [SetOpinions, Opinion | null]) => (respect: number, dissent: number) => {
    console.log('currentOpinon', currentOpinion)
    const sessionId = localStorage.getItem('opinio-session');

    return axiosInstance.post(`${sessionId}/update`, {
        'left': 0,
        'right': currentOpinion?.id,
        respect,
        dissent
    }).then((response) => {
        setOpinions(response.data.nodes as Opinion[]);
    })
}

// --- Provider ----
export const OpinionsProvider = (props: any) => {
    const {session} = useSessionContext();
    const [opinions, setOpinions] = useState<Opinion[] | null>(null);
    const [currentOpinion, setCurrentOpinion] = useState<Opinion | null>(null);

    const value = useMemo(
        () => ({
            opinions,
            setOpinions,
            currentOpinion,
            setCurrentOpinion,
            getUsers: {},
            advanceOpinion: advanceOpinion([setOpinions]),
            updateOpinion: updateLayout([setOpinions, currentOpinion])
        }),
        [currentOpinion, opinions]
    );

    useEffect(() => {
        const nodes = getLayout(session);

        if (nodes) {
            nodes?.then((response) => {
                setOpinions(response);
                setCurrentOpinion(response[0])
            });
        }
    }, [session])

    return <OpinionsContext.Provider value={value} {...props} />;
};