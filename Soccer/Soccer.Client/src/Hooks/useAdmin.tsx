import {useContext} from "react";
import {AdminContext} from "../Context/AdminContext.tsx";

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if(!context) {
        throw new Error('useAdmin must be used within useAdmin');
    }
    return context;
}

