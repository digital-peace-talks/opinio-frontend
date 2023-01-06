import { useContext } from "react";
import { OpinionsContext } from "../contexts/opinions";

export const useOpinionsContext = () => {
  const context = useContext(OpinionsContext);

  if (!context) 
    throw new Error("useOpinionsContext requires a OpinionsProvider!");

  return context;
};