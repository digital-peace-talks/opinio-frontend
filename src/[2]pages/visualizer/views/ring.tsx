export const Ring = (props: {
    containerRadius: number;
    rradius: number; 
    pixels?: number;
    borderStyle?: string 
}) => {
  const { containerRadius, rradius, pixels = 1, borderStyle = 'solid' } = props;

  const radius = containerRadius * rradius;
  const margin = (containerRadius - radius) / 2;
  

  return (
    <div
      className='bg-white rounded-full absolute'
      style={{
        border: `${pixels}px ${borderStyle} white`,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        margin,
        width: radius,
        height: radius,
      }}/>
  );
}