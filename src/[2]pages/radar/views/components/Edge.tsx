import {Edge as IEdge, Opinion, Coord} from "[2]pages/radar/contexts/opinions";
import {useOpinionsContext} from "[2]pages/radar/hooks/use-opinions-context";
import {getNodeEdges} from "../../helper/get-node-edges";

interface EdgeProps {
    from: Coord;
    to: Coord;
    containerLength: number;
    isBlack: boolean;
}

interface LineProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: 'dark' | 'light'
}

const Line: React.FC<LineProps> = ({x1, y1, x2, y2, color}) => {
    const lineStyle: React.CSSProperties = {
        stroke: color === 'dark' ? 'black' : "#f5f5f5",
        strokeWidth: 1,
        opacity: color === 'dark' ? 1 : 0.5,
    };

    return (
        <svg width="100%" height="100%">
            <line x1={x1} y1={y1} x2={x2} y2={y2} style={lineStyle}/>
        </svg>
    );
};


export const Edge = ({from, to, containerLength, isBlack}: EdgeProps) => {
    const relLength = 0.025;
    const outerRelLength = relLength * 4;
    const nodeLength = relLength * containerLength * 2;
    const xFrom = (((from.x + 1) / 2 - outerRelLength / 2) * containerLength).toFixed(2);
    const yFrom = (((from.y + 1) / 2 - outerRelLength / 2) * containerLength).toFixed(2);
    const xTo = (((to.x + 1) / 2 - outerRelLength / 2) * containerLength).toFixed(2);
    const yTo = (((to.y + 1) / 2 - outerRelLength / 2) * containerLength).toFixed(2);

    return (
        <div className='absolute inset-0 -z-0' style={{width: containerLength, height: containerLength}}>
            <Line x1={+xFrom + nodeLength / 2} y1={+yFrom + nodeLength / 2} x2={+xTo + nodeLength / 2}
                  y2={+yTo + nodeLength / 2} color={isBlack ? 'dark' : 'light'}/>
        </div>
    );
}