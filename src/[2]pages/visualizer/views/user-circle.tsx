import {Opinion} from "../contexts/opinions";
import {useOpinionsContext} from "../hooks/use-opinions-context";
import {useNavigate} from 'react-router-dom'

export const OpinionCircle = (params: { containerLength: number; opinion: Opinion; }) => {
    const navigate = useNavigate();
    const {currentOpinion} = useOpinionsContext();

    const {containerLength, opinion} = params;

    const relLength = 0.025;
    const outerRelLength = relLength * 4;
    const length = relLength * containerLength * 2;
    const visibleLength = relLength * containerLength;
    // const x = ~~((opinion.coord.x - outerRelLength / 2) * containerLength);
    // const y = ~~((opinion.coord.y - outerRelLength / 2) * containerLength);
    const x = ~~(((opinion.coord.x + 1) / 2 - outerRelLength / 2) * containerLength);
    const y = ~~(((opinion.coord.y + 1) / 2 - outerRelLength / 2) * containerLength);

    let color = opinion.id === 59 ? "bg-red-700" : opinion.id === currentOpinion?.id ? 'bg-blue-400' : 'bg-white';
    const border = opinion.id === currentOpinion?.id ? '1px solid rgba(255, 255, 255, 0.5)' : undefined;
    const zIndex = opinion.id === currentOpinion?.id ? 100 : undefined;

    // console.log('x =', x, '==>', ((opinion.coord.x)), 'y =', y, '==>', ((opinion.coord.y)))

    return (
        <div
            className={`flex justify-center items-center absolute aspect-square rounded-full hover:cursor-pointer`}
            style={{
                width: length,
                left: x,
                top: y,
                zIndex,
            }}
            onClick={() => {
                navigate('/chat/' + opinion.id)
            }}>
            <div
                className={`aspect-square rounded-full ${color}`}
                style={{width: visibleLength, border}}/>
        </div>
    );
}