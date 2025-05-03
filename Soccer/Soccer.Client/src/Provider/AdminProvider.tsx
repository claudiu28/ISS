import React, {useEffect, useState} from "react";
import {useAuth} from "../Hooks/useAuth";
import {AdminContext} from "../Context/AdminContext";
import AdminService from "../Services/AdminService";
import AdminDto from "../../dto/AdminDto";
import AdminContextType from "../Context/interfaces/AdminContextType.ts";

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
    const { token, user } = useAuth();
    const [admin, setAdmin] = useState<AdminDto | null>(null);

    const allUsers = async (): Promise<AdminDto[]> => {
        return await AdminService.getUsers();
    };

    const addRole = async (userId: number, role: string): Promise<AdminDto> => {
        return await AdminService.addUserRole(userId, role);
    };

    const removeRole = async (userId: number, role: string): Promise<AdminDto> => {
        return await AdminService.removeUserRole(userId, role);
    };

    const deleteUser = async (userId: number): Promise<void> => {
        await AdminService.deleteUser(userId);
    };

    const searchUserById = async (userId: number): Promise<AdminDto> => {
        return await AdminService.searchUserById(userId);
    };

    const searchUserByUsername = async (username: string): Promise<AdminDto> => {
        return await AdminService.searchUserByUsername(username);
    };

    const searchByLastName = async (lastName: string): Promise<AdminDto[]> => {
        return await AdminService.searchByLastName(lastName);
    };

    const searchByFirstName = async (firstName: string): Promise<AdminDto[]> => {
        return await AdminService.searchByFirstName(firstName);
    };

    useEffect(() => {
        if (token) {
            searchUserByUsername(user?.username || "Guests").then(user => {
                setAdmin(user);
            });
        }
    }, [token, user?.username]);

    const value: AdminContextType = {
        admin,
        allUsers,
        addRole,
        removeRole,
        deleteUser,
        searchUserById,
        searchUserByUsername,
        searchByLastName,
        searchByFirstName,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};
