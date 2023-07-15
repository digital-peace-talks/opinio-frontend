import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Opinion } from '[2]pages/radar/contexts/opinions';
import { useOpinionsContext } from '[2]pages/radar/hooks/use-opinions-context';
import { getNodeEdges } from '../../helper/get-node-edges';
import { Edge } from '[2]pages/radar/views/components/Edge';
import clsx from 'clsx';

interface NodeProps {
  containerLength: number;
  opinion: Opinion;
}

export const Node = ({ containerLength, opinion }: NodeProps) => {
  const navigate = useNavigate();
  const { currentOpinion, edges, opinions } = useOpinionsContext();

  const relLength = 0.025;
  const outerRelLength = relLength * 4;
  const length = relLength * containerLength * 2;
  const visibleLength = relLength * containerLength;
  // const x = (((opinion.coord.x + 1) / 2 - outerRelLength / 2) * containerLength).toFixed(2);
  // const y = (((opinion.coord.y + 1) / 2 - outerRelLength / 2) * containerLength).toFixed(2);
  const x = (
    ((opinion.coord.x + 1) / 2 - outerRelLength / 2) *
    containerLength
  ).toFixed(2);
  const y = (
    ((opinion.coord.y + 1) / 2 - outerRelLength / 2) *
    containerLength
  ).toFixed(2);

  // let color = opinion.id === 59 ? "bg-red-700 " : opinion.id === currentOpinion?.id ? 'bg-blue-400' : 'bg-white';
  let color =
    opinion.id === 59
      ? 'bg-white border-2 border-black '
      : opinion.id === currentOpinion?.id
      ? 'bg-blue-900'
      : 'bg-white';
  // const border = opinion.id === currentOpinion?.id ? '2px solid rgba(255, 255, 255, 0.5)' : undefined;
  const border =
    opinion.id === currentOpinion?.id
      ? '2px solid rgba(255, 255, 255, 0.5)  '
      : undefined;
  const zIndex = opinion.id === currentOpinion?.id ? 100 : 50;

  const myEdges = getNodeEdges(edges, opinion.id);
  const isConnectedTo60 = edges.some(
    (ele) => ele.left === 59 && ele.right === opinion.id
  );
  const [isHovered, setIsHovered] = useState(false);
  // console.log('isHovered', isHovered);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/*{opinion.id === 59 &&*/}
      {/*  <div*/}
      {/*    className='absolute text-[8px] text-white text-bold z-50 !leading-sm bg-gray-600 text-center rounded p-0.5'*/}
      {/*    style={{*/}
      {/*        left: x + 'px',*/}
      {/*        top: (+y - 15) + 'px',*/}
      {/*    }}>This is your opinion</div>}*/}

      {myEdges.map((ele) => (
        <Edge
          from={opinion.coord}
          to={opinions[ele.right].coord}
          containerLength={containerLength}
          isBlack={opinion.id === 59}
        />
      ))}
      <div
        className={clsx(
          'flex justify-center items-center absolute aspect-square rounded-full',
          isConnectedTo60
            ? 'cursor-pointer'
            : 'cursor-no-drop pointer-events-none'
        )}
        style={{
          width: length,
          left: x + 'px',
          top: y + 'px',
          zIndex,
        }}
        aria-disabled={!isConnectedTo60}
        data-id={opinion.id}
        onClick={() => {
          if (isConnectedTo60) navigate('/chat/' + opinion.id);
        }}
      >
        <div
          className={`aspect-square rounded-full ${color} ${
            isConnectedTo60 ? ' border-2  border-blue-400' : ''
          }  `}
          style={{ width: visibleLength, border }}
        />
      </div>
      {isHovered && opinion.id !== 59 && (
        <div
          className=" absolute"
          style={{
            maxWidth: '200px',
            left: +x + 10 + 'px',
            top: +y + 8 + 'px',
            zIndex: 100,
            padding: '6px 8px',
            borderRadius: '6px',
            background: 'rgba(255, 255, 255, 0.80)',
            cursor: isConnectedTo60 ? 'pointer' : 'no-drop',
          }}
          onClick={() => {
            if (isConnectedTo60) navigate('/chat/' + opinion.id);
          }}
        >
          <h1
            style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000',
            }}
          >
            {/* {opinion.opinion} */}
            {opinion.opinion.length > 50
              ? `${opinion.opinion.substring(0, 50)}...`
              : opinion.opinion}
          </h1>
        </div>
      )}
    </div>
  );
};
