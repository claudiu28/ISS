import UserDto from "../../../dto/UserDto.ts";

interface AuthContextType {
    user : UserDto | null;
    token : string | null;
    login : (token : string, username : string, roles : string[]) => Promise<void>
    logout: () => Promise<void>
}
export default AuthContextType;