import { Graph } from "./radar";
import { Ring } from "./ring";

export const PageBody = (props: { height: number; userId: string }) => {
  const { height, userId } = props;
  return (
    <div className='flex flex-1 flex-col justify-center'>
      <div
        className='flex flex-col justify-center items-center'
        style={{ height }}>
        <Ring containerDiameter={height * 0.93} relDiameter={1} borderStyle='dashed'/>
        <Graph containerLength={height * 0.87} userId={userId}/>
      </div>
    </div>

  )
}