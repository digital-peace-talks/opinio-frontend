import {Opinion} from "[2]pages/radar/contexts/opinions";

export const filterOpinion = (opinions: Opinion[], id: number) => opinions.find((op) => op.id === id)
