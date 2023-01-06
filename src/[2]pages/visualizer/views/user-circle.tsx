import { useState } from "react";
import { Opinion } from "../contexts/opinions";
import { useOpinionsContext } from "../hooks/use-opinions-context";

export const OpinionCircle = (params: { containerLength: number; opinion: Opinion; userId: string }) => {
  const { containerLength, opinion, userId } = params;
  const { advanceOpinion } = useOpinionsContext(); 

  const relLength = 0.025;
  const length = relLength * containerLength;
  const x = ~~((opinion.position.relX - relLength / 2) * containerLength);
  const y = ~~((opinion.position.relY - relLength / 2) * containerLength);

  let color = opinion.userId === userId ? 'bg-blue-400' : 'bg-white';
  const border = opinion.userId === userId ? '1px solid rgba(255, 255, 255, 0.5)' : undefined;
  const zIndex = opinion.userId === userId ? 100 : undefined;

  return (
    <div
      className={`absolute aspect-square rounded-full ${color}`}
      style={{
        width: length,
        left: x,
        top: y,
        border,
        zIndex,
      }}
      onClick={() => {
        if (opinion.userId !== '1') {
          advanceOpinion({ id: opinion.userId, advance: 0.05 });
          advanceOpinion({ id: opinion.userId, advance: 0.05 });
        }
      }}/>
  );
}