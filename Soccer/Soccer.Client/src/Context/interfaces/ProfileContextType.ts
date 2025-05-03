import ProfileDto from "../../../dto/ProfileDto.ts";

export interface ProfileDataType {
    profile : ProfileDto | null;
    updateProfile: (data : {firstName?: string, lastName?: string}) => Promise<void>;
    removePicture: () => Promise<void>;
    uploadPicture: (imageUrl : string) => Promise<void>;
}
export default ProfileDataType;