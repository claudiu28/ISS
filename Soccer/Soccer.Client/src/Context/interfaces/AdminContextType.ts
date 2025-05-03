import AdminDto from "../../../dto/AdminDto.ts";

interface AdminContextType {
    admin : AdminDto | null;
    allUsers : () => Promise<AdminDto[]>;
    addRole : (userId : number, role : string) => Promise<AdminDto>
    removeRole : (userId: number, role : string) => Promise<AdminDto>
    deleteUser : (userId: number) => Promise<void>
    searchUserById : (userId : number) => Promise<AdminDto>
    searchUserByUsername : (username : string) => Promise<AdminDto>
    searchByLastName : (lastName : string) => Promise<AdminDto[]>
    searchByFirstName : (firstName : string) => Promise<AdminDto[]>
}

export default AdminContextType;