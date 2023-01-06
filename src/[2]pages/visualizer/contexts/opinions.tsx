import React, { createContext, useMemo, useState, useEffect } from "react";

// --- Interfaces ---
export interface Opinion {
  userId: string;
  username: string;
  position: {
    relX: number;
    relY: number;
  }
}

// --- Types ---
type SetOpinions = React.Dispatch<React.SetStateAction<Opinion[] | null>>;

interface OpinionProps {
  opinions: Opinion[];
  setOpinions: SetOpinions;
  getOpinions: () => void;
  advanceOpinion: (props: { id: string; advance: number }) => void;
}

// --- Context ----
export const OpinionsContext = createContext<OpinionProps | null>(null);

// ---- Logic -----
const getOpinions = ([setOpinions]:  [SetOpinions]) => (
) => {
  const opinions: Opinion[] = [
    { userId: '1', username: 'Giovanni', position: { relX: 0.2, relY: 0.8 } },
    { userId: '2', username: 'Sally', position: { relX: 0.34, relY: 0.15 } },
    { userId: '3', username: 'Patrick', position: { relX: 0.175, relY: 0.298 } },
    { userId: '4', username: 'Julia', position: { relX: 0.45, relY: 0.119 } },
    { userId: '5', username: 'Angus', position: { relX: 0.834, relY: 0.5 } },
    { userId: '6', username: 'Mary', position: { relX: 0.766, relY: 0.6 } },
  ];

  setOpinions(opinions);
};

const advanceOpinion = ([setOpinions]: [SetOpinions]) =>
  (props: { id: string; advance: number }) => {
    const { id, advance } = props;

    setOpinions((opinions) => {
      if (opinions) {
        return opinions.map((opinion) => {
          if (opinion.userId === id) {
            const { relX, relY } = opinion.position;

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
  }

// --- Provider ----
export const OpinionsProvider = (props: any) => {
  const [opinions, setOpinions] = useState<Opinion[] | null>(null);

  const value = useMemo(
    () => ({
      opinions,
      setOpinions,
      getUsers: getOpinions([setOpinions]),
      advanceOpinion: advanceOpinion([setOpinions]),
    }),
    [opinions, setOpinions]
  );

  useEffect(() => {
    getOpinions([setOpinions])();
  }, []);

  return <OpinionsContext.Provider value={value} {...props} />;
};