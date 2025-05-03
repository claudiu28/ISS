import {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.tsx";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within useAuth');
    }
    return context;
}

