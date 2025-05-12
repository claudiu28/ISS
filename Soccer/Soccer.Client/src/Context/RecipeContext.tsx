import { createContext } from "react";
import { RecipeContextType } from "./interfaces/RecipeContextType";

export const RecipeContext = createContext<RecipeContextType | undefined>(undefined);