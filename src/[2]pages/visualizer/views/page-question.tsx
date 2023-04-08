import {useOpinionsContext} from "../hooks/use-opinions-context";

export const PageQuestion = (props: { height: number }) => {
    const {height} = props;
    const {currentOpinion} = useOpinionsContext()

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
                {currentOpinion?.opinion}
            </p>
        </div>
    );
}