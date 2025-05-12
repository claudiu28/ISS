import AdminDto from "../../dto/AdminDto.ts";
import api from "../API/api.ts";

class AdminService {
    async getUsers(): Promise<AdminDto[]> {
        const response = await api.get<AdminDto[]>("/users/all-users");
        return response.data;
    }

    async addUserRole(id: number, role: string): Promise<AdminDto> {
        const response = await api.post<AdminDto>(`/users/${id}/add-role-to-user/`, JSON.stringify(role), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async removeUserRole(id: number, role: string): Promise<AdminDto> {
        const response = await api.post<AdminDto>(`/users/${id}/remove-role-to-user/`, JSON.stringify(role), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async deleteUser(id: number): Promise<void> {
        await api.delete(`/users/${id}/delete-user/`);
    }

    async searchUserById(id: number): Promise<AdminDto> {
        const response = await api.get<AdminDto>(`/users/users-by-id/`, {params: {id}});
        return response.data;
    }

    async searchUserByUsername(username: string): Promise<AdminDto> {
        const response = await api.get<AdminDto>(`/users/users-by-username/`, {params: {username}});
        return response.data;
    }

    async searchByLastName(lastname: string): Promise<AdminDto[]> {
        const response = await api.get<AdminDto[]>(`/users/users-by-lastname/`, {params: {lastname}});
        return response.data;
    }

    async searchByFirstName(firstname: string): Promise<AdminDto[]> {
        const response = await api.get<AdminDto[]>(`/users/users-by-firstname/`, {params: {firstname}});
        return response.data;
    }

}
export default new AdminService;