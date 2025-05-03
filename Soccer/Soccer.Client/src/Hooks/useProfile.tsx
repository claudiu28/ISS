import {useContext} from "react";
import {ProfileContext} from "../Context/ProfileContext.tsx";

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if(!context) {
        throw new Error('useProfile must be used within useProfile');
    }
    return context;
}

