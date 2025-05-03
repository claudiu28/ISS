import React, {useEffect, useState} from "react";
import ProfileService from "../Services/ProfileService.ts";
import {useAuth} from "../Hooks/useAuth.tsx";
import { ProfileContext } from "../Context/ProfileContext.tsx";


export const ProfileProvider = ({children} : {children: React.ReactNode}) => {
    const [profile, setProfile] = useState<{ firstName: string, lastName: string, profileImage: string }>({
        firstName: "",
        lastName: "",
        profileImage: "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060"
    });
    const {token} = useAuth();
    useEffect(() => {
        const profileInit = async () => {
            try {
                const data = await ProfileService.getProfile();
                setProfile({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    profileImage: data.profileImage || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060"
                })
            } catch (error) {
                console.error((error as Error).message);
            }
        }
        if(token) {
            profileInit().then(() => {});
        }
    },[token]);

    const updateProfile = async (data : {firstName?: string, lastName?: string}) => {
        try {
            const response = await ProfileService.updateProfile(data);
            setProfile((prev) => ({
                ...prev,
                firstName: response.firstName || "",
                lastName: response.lastName || ""
            }))
        } catch (error) {
            console.error(error);
        }
    }

    const removePicture = async () => {
        try {
            const response = await ProfileService.removePicture();
            setProfile((prev) => ({
                ...prev,
                avatar: response.profileImage || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060"
            }));
        } catch (error) {
            console.error(error);
        }
    }

    const uploadPicture = async (imageUrl : string) => {
        try {
            const response = await ProfileService.uploadPicture(imageUrl);
            setProfile((prev) =>({
                ...prev,
                avatar: response.profileImage || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060"
            }))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ProfileContext.Provider value = {{profile,updateProfile,removePicture,uploadPicture}}>
            {children}
        </ProfileContext.Provider>
    )
}