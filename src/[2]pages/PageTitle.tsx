
export const PageTitle = (props: { height: number }) => {
  const { height } = props;

  return (
    <div
      className='flex justify-center items-center box-border'
      style={{ height }}>
      <p
        className='text-white text-3xl p-2.5'
        style={{ fontFamily: 'Lufga-Regular' }}>
        polarizer
      </p>
    </div>
  )
}