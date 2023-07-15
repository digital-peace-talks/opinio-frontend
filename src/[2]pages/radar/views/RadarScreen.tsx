import { memo } from 'react';
import { RadarBody } from '[2]pages/radar/views/components/RadarBody';
import { useOpinionsContext } from '[2]pages/radar/hooks/use-opinions-context';
import { PageQuestion } from '[2]pages/PageQuestion';
import { useWindowDimensions } from '../../../[1]shared/hooks/use-window-dimensions';
import arrowR from '../assets/arrowR.png';
import arrowL from '../assets/arrowL.png';
import circle from '../assets/circle.png';
import logo from '../assets/logo.png';


export const RadarScreen = memo(() => {
  const { min } = useWindowDimensions();
  const { opinions } = useOpinionsContext();

  return (
    <>
      <div className="LeftDiv w-full z-10 mt-[20px] mb-[40px]">
        <div className="logo mt-5 w-[150px] md:ml-[60px] ml-[20px]">
          <img src={logo} alt="" />
        </div>
        <div className="Card  text-white flex flex-col lg:gap-[240px] gap-[20px] w-[97%]   min-[1024px]:w-[500px]  mt-[20px] mx-[20px]  md:mt-[20px] md:mx-[60px] ">
          <div className="Top">
            <h2 className="md:text-[40px] max-[415px]:text-[25px] max-[590px]:text-[30px] max-[768px]:text-[35px] font-medium  max-[1025px]:w-[700px] max-[500px]:w-[400px] max-[768px]:w-[550px]  max-[470px]:w-full   lg:pr-4 ">
              <PageQuestion />
              {/* What should be done about climate change? */}
            </h2>
            <span className="text-base font-normal">
              {opinions?.length} opinions
            </span>
          </div>
          <div className="flex flex-col w-full justify-start lg:hidden ml-[-10px]">
            <RadarBody height={min / (min < 700 ? 1.2 : 1.7)} />
          </div>
          <div className="Bottom flex flex-col gap-4 ">
            <p className="flex items-center gap-3 text-base font-normal">
              <img src={arrowR} alt="" className="w-[40px] h-[40px]" />
              Select opinion to chat with
            </p>
            <p className="flex items-center gap-3 text-base font-normal">
              <img src={arrowL} alt="" />
              Rate Empathy and Disagreement
            </p>
            <p className="flex items-center gap-3 text-base font-normal">
              <img src={circle} alt="" />
              Graph is updated. Reach the middle!
            </p>
          </div>
        </div>
      </div>
      <div className=" flex-col w-full justify-start hidden  lg:flex">
        <RadarBody height={min / (min < 700 ? 1.2 : 1.7)} />
      </div>
    </>
  );
});
