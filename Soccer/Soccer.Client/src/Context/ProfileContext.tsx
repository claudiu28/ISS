import ProfileContextType from "./interfaces/ProfileContextType.ts";
import {createContext} from "react";

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);