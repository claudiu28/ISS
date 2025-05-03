import api from "../API/api.ts"
import UserDto from "../../dto/UserDto.ts";

class AuthService {
    async register(username: string, password: string, verifyPassword: string) {
        return api.post<UserDto>("/auth/register", {username,password,verifyPassword});
    }

    async login(username: string, password: string) {
        return api.post<UserDto>("/auth/login", {username,password});
    }
}

export default new AuthService;