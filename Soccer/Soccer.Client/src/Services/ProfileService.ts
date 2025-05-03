import api from "../API/api.ts";
import ProfileDto from "../../dto/ProfileDto.ts";

class ProfileService {
    async getProfile() {
        const response = await api.get<ProfileDto>("/users/me");
        return response.data;
    }

    async updateProfile(data: { firstName?: string; lastName?: string }) {
        const response = await api.put<ProfileDto>("/users/update-profile", data);
        return response.data;
    }

    async uploadPicture(imageUrl: string) {
        const response = await api.put<ProfileDto>("/users/upload-picture", { image: imageUrl });
        return response.data;
    }

    async removePicture(){
        const response = await api.put<ProfileDto>("/users/remove-picture");
        return response.data;
    }
}

export default new ProfileService;
