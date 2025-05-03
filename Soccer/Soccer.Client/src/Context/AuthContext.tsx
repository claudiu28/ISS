import AuthContextType from "./interfaces/AuthContextType.ts";
import {createContext} from "react";
export const AuthContext = createContext<AuthContextType | undefined>(undefined);


