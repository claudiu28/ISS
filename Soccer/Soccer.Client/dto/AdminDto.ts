interface AdminDto{
    id: number;
    username: string;
    lastName: string | null;
    firstName: string | null;
    userRoles: string[] | null;
    profileImage: string;
}
export default AdminDto;