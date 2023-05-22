import {useOpinionsContext} from "[2]pages/radar/hooks/use-opinions-context";
import {Ring} from "[2]pages/radar/views/components/Ring";
import {Node} from "[2]pages/radar/views/components/Node";

export const Graph = (props: { containerLength: number; }) => {
    const {containerLength} = props;
    const {opinions} = useOpinionsContext();

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
            className='aspect-square rounded-full relative overflow-visible'
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
            <div className="absolute inset-0 flex justify-center items-center">
                {Array.isArray(ringRelDiameters) && ringRelDiameters.map((ringRelDiameter =>
                        <Ring containerDiameter={containerLength} relDiameter={ringRelDiameter} key={ringRelDiameter}/>
                ))}
            </div>

            {Array.isArray(opinions) && opinions.map((opinion) =>
                <Node containerLength={containerLength} opinion={opinion}
                      key={opinion.id}/>
            )}
        </div>
    )
}