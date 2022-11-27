export const UserCircle = (params: { containerLength: number; rx: number; ry: number}) => {
  const { containerLength, rx, ry } = params;

  const length = 0.025 * containerLength;
  const x = ~~(rx * containerLength);
  const y = ~~(ry * containerLength);

  return (
    <div
      className='bg-white rounded-full absolute aspect-square'
      style={{
        width: length,
        left: x,
        top: y,
      }}/>
  );
}