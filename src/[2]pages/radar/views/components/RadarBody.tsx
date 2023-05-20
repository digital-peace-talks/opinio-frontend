import {useEffect, useState} from "react";
import {Graph} from "[2]pages/radar/views/components/Graph";
import {Ring} from "[2]pages/radar/views/components/Ring";
import {useOpinionsContext} from "[2]pages/radar/hooks/use-opinions-context";
import Snackbar from "[1]shared/components/Snackbar";

export const RadarBody = (props: { height: number; }) => {
    const {height} = props;
    const {isLayoutRequested, tempOpinions, mergeOpinion, setDisableNodes, disableNodes} = useOpinionsContext();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (isLayoutRequested) {
            setShowMessage(true)
            setDisableNodes(true)
        }

        if (!isLayoutRequested && tempOpinions) {
            setShowMessage(true)
            setDisableNodes(true)
            setTimeout(() => {
                mergeOpinion()
                setShowMessage(false)
                setDisableNodes(false)
            }, 2000)
        }
    }, [isLayoutRequested, mergeOpinion, setDisableNodes, tempOpinions])

    return (
        <div className='flex flex-1 flex-col justify-center'>
            {showMessage && <Snackbar message="Updating Layout..." duration={!tempOpinions ? 5000 : 2000}/>}

            <div
                className='flex flex-col justify-center items-center relative'
                style={{
                    height, opacity: disableNodes ? 0.85 : 1,
                    pointerEvents: disableNodes ? 'none' : 'inherit',
                }}>
                <Ring containerDiameter={height * 0.93} relDiameter={1} borderStyle='dashed'/>
                <Graph containerLength={height * 0.87}/>
            </div>
        </div>
    )
}