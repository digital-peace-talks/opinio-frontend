import {Opinion} from "../../[2]pages/visualizer/contexts/opinions";

export const filterOpinion = (opinions: Opinion[], id: number) => opinions.filter((op) => op.id === id)
