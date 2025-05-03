import * as React from "react";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.tsx";

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<{username : string, roles : string[], token : string}>({username: "", roles: [], token: ""});
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if(storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const login =  async (token : string, username : string, roles: string[]) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({username, roles}));
        setToken(token);
        setUser({username, roles, token});
    }

    const logout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser({username: "", roles: [], token: ""});
        navigate("/");
    }
    return (
        <AuthContext.Provider value = {{token,user,login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}