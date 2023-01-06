
export const PageQuestion = (props: { height: number }) => {
  const { height } = props;

  const padding = 10;

  return (
    <div
      className='flex justify-center items-center box-content text-center text-white'
      style={{
        fontFamily: 'Lufga-Regular',
        height: height - padding,
        padding: `${padding}px`,
        backgroundImage: 'linear-gradient(to right, black, #0702a1, black)'
      }}>
      <p>
        What do you think of Donald Trump?
      </p>
    </div>
  );
}