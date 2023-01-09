import { useOpinionsContext } from "../hooks/use-opinions-context";
import { Ring } from "./ring";
import { OpinionCircle } from "./user-circle";

export const Graph = (props: { containerLength: number; opinionId: string }) => {
  const { containerLength, opinionId } = props;
  const { opinions } = useOpinionsContext();

  const colors = [
    '#03d775',
    '#66c947',
    '#c1bc1d',
    '#fdab05',
    '#ed642f',
    '#d90765',
  ];

  const ringRelDiameters = [1, 0.93, 0.85, 0.77, 0.67, 0.57, 0.47, 0.35, 0.21];

  return (
    <div
      className='aspect-square rounded-full relative'
      style={{
        width: containerLength,
        backgroundImage: `radial-gradient(
          ${colors[0]} 10%,
          ${colors[1]},
          ${colors[2]},
          ${colors[3]}, 
          ${colors[4]} 60%,
          ${colors[5]} 70%
        )`
      }}>
      {Array.isArray(ringRelDiameters) && ringRelDiameters.map((ringRelDiameter =>
        <Ring containerDiameter={containerLength} relDiameter={ringRelDiameter}/>
      ))}
      {Array.isArray(opinions) && opinions.map((opinion) =>
        <OpinionCircle containerLength={containerLength} opinion={opinion} opinionId={opinionId}/>
      )}
    </div>
  )
}