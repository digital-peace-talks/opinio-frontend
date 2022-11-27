import React from 'react';
import { useMinWindowDimension } from "../../../[1]shared/hooks/use-min-window-dimension";
import { Ring } from './ring';
import { UserCircle } from "./user-circle";

export const Visualizer = () => {
  const { min, isMinHeight, height } = useMinWindowDimension();

  const titleHeight = 60;
  const viewHeight = height;

  const heightReduction = isMinHeight ? titleHeight : 0;
  const containerLength = (min - heightReduction) * 0.85

  const colors = [
    '#03d775',
    '#66c947',
    '#c1bc1d',
    '#fdab05',
    '#ed642f',
    '#d90765',
  ];

  const ringRadi = [1, 0.93, 0.85, 0.77, 0.67, 0.57, 0.47, 0.35, 0.21];

  const userPositions = [
    { x: 0.2, y: 0.8 },
    { x: 0.305, y: 0.15 },
    { x: 0.154, y: 0.298 },
    { x: 0.45, y: 0.105 },
    { x: 0.823, y: 0.5 },
    { x: 0.75, y: 0.6 },
  ];

  return (
    <div className='flex flex-col justify-start w-screen h-screen'>
      <div
        className='flex justify-center items-center box-border bg-black '
        style={{ height: titleHeight }}>
        <p
          className='text-white text-3xl p-2.5'
          style={{ fontFamily: 'Lufga-Regular' }}>
          polarizer
        </p>
      </div>
      <div
        className='flex flex-col justify-center items-center bg-black'
        style={{ height: viewHeight }}>
        <Ring containerRadius={containerLength * 1.07} rradius={1} borderStyle='dashed'/>
        <div
          className='aspect-square rounded-full relative'
          style={{
            width: containerLength,
            backgroundImage: `radial-gradient(
              ${colors[0]} 10%,
              ${colors[1]},
              ${colors[2]},
              ${colors[3]}, 
              ${colors[4]},
              ${colors[5]} 70%
            )`
          }}>
          {ringRadi.map((ringRadius =>
            <Ring containerRadius={containerLength} rradius={ringRadius}/>
          ))}
          {userPositions.map((userPosition) =>
            <UserCircle containerLength={containerLength} rx={userPosition.x} ry={userPosition.y}/>
          )}
        </div>
      </div>
    </div>
  );
}