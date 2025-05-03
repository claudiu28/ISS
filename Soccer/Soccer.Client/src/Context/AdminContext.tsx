import AdminContextType from "./interfaces/AdminContextType.ts";
import {createContext} from "react";
export const AdminContext =  createContext<AdminContextType | undefined>(undefined);