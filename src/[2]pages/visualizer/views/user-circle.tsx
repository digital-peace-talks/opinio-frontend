import { Opinion } from "../contexts/opinions";
import { Screen } from "../contexts/screen";
import { useChatContext } from "../hooks/use-chat-context";
import { useScreenContext } from "../hooks/use-screen-context";

export const OpinionCircle = (params: { containerLength: number; opinion: Opinion; opinionId: string }) => {
  const { setChatIndex } = useChatContext();
  const { setScreen } = useScreenContext();

  const { containerLength, opinion, opinionId } = params;

  const relLength = 0.025;
  const outerRelLength = relLength * 4;
  const length = relLength * containerLength * 4;
  const visibleLength = relLength * containerLength;
  const x = ~~((opinion.position.relX - outerRelLength / 2) * containerLength);
  const y = ~~((opinion.position.relY - outerRelLength / 2) * containerLength);

  let color = opinion.id === opinionId ? 'bg-blue-400' : 'bg-white';
  const border = opinion.id === opinionId ? '1px solid rgba(255, 255, 255, 0.5)' : undefined;
  const zIndex = opinion.id === opinionId ? 100 : undefined;

  return (
    <div
      className={`flex justify-center items-center absolute aspect-square rounded-full hover:cursor-pointer`}
      style={{
        width: length,
        left: x,
        top: y,
        zIndex,
      }}
      onClick={() => {
        if (opinion.id !== '1') {
          setChatIndex(Number(opinion.id) - 2);
          setScreen(Screen.Chat);
        }
      }}>
      <div
        className={`aspect-square rounded-full ${color}`}
        style={{ width: visibleLength, border }}/>
    </div>
  );
}