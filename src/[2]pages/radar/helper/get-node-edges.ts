import {Edge} from "[2]pages/radar/contexts/opinions";

export const getNodeEdges = (edges: Edge[], id: number) => edges.filter((op) => op.left === id)
