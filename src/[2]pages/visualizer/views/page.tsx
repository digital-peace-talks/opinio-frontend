import { memo } from 'react';
import { useWindowDimensions } from "../../../[1]shared/hooks/use-window-dimensions";
import { OpinionsProvider } from '../contexts/opinions';
import { PageBody } from './page-body';
import { PageQuestion } from "./page-question";
import { PageTitle } from './page-title';

export const RadarScreen = memo((props: { opinionId: string }) => {
  const { opinionId } = props;

  return (
    <div className='flex flex-col w-full h-full justify-start bg-black'>
      <PageBody height={400} opinionId={opinionId}/>
    </div>
  );
});