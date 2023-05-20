export const Ring = (props: {
    containerDiameter: number;
    relDiameter: number;
    pixels?: number;
    borderStyle?: string;
}) => {
    const {containerDiameter, relDiameter, pixels = 1, borderStyle = 'solid'} = props;

    const diameter = containerDiameter * relDiameter;
    // const margin = (containerDiameter - diameter) / 2;

    return (
        <div
            className='bg-white rounded-full absolute'
            style={{
                border: `${pixels}px ${borderStyle} rgba(255, 255, 255, 0.5)`,
                backgroundColor: 'rgba(255, 255, 255, 0)',
                // margin,
                width: diameter,
                height: diameter,
            }}/>
    );
}
