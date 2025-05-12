import {useEffect, useState} from "react";
import {Users, Trophy, BarChart, MoreHorizontal, Search} from "lucide-react";
import DashboardSidebar from "../Components/dashboards/sidebar.tsx";
import {useAdmin} from "../Hooks/useAdmin.tsx";
import AdminDto from "../../dto/AdminDto.ts";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("users");
    const [dropdownOpen, setDropdownOpen] = useState<{ id: number | null, type: string | null }>({
        id: null,
        type: null
    });
    const [users, setUsers] = useState<AdminDto[]>([]);
    const {allUsers, addRole, removeRole, deleteUser} = useAdmin();
    const [searchType, setSearchType] = useState("username");
    const [searchQuery, setSearchQuery] = useState("");
    const { searchUserById, searchUserByUsername, searchByLastName, searchByFirstName } = useAdmin();
    const [searchResult, setSearchResult] = useState<AdminDto[] | null>(null);

    const stats = {
        totalTeams: 42,
        totalCompetitions: 8,
        activeUsers: 134,
    };

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const userList = await allUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Error loading users:", error);
                alert("Failed to load users. Please refresh the page.");
            }
        };

        loadUsers().then();
    }, [allUsers]);

    useEffect(() => {
        const handleClickOutside = () => {
            setDropdownOpen({id: null, type: null});
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert("Please enter a search term");
            return;
        }

        try {
            let result: AdminDto[] = [];

            if (searchType === "id") {
                const idNumber = Number(searchQuery);
                if (isNaN(idNumber)) {
                    alert("Please enter a valid numeric ID");
                    return;
                }
                const user = await searchUserById(idNumber);
                result = user ? [user] : [];
            } else if (searchType === "username") {
                const users = await searchUserByUsername(searchQuery);
                result = Array.isArray(users) ? users : (users ? [users] : []);
            } else if (searchType === "firstname") {
                const users = await searchByFirstName(searchQuery);
                result = Array.isArray(users) ? users : (users ? [users] : []);
            } else if (searchType === "lastname") {
                const users = await searchByLastName(searchQuery);
                result = Array.isArray(users) ? users : (users ? [users] : []);
            }

            if (result.length === 0) {
                alert(`No users found with ${searchType === "id" ? "ID" : searchType}: "${searchQuery}"`);
            }

            setSearchResult(result);

        } catch (error) {
            console.error("Search error:", error);
            alert("An error occurred while searching. Please try again.");
            setSearchResult([]);
        }
    };

    const toggleDropdown = (id: number, type: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (dropdownOpen.id === id && dropdownOpen.type === type) {
            setDropdownOpen({id: null, type: null});
        } else {
            setDropdownOpen({id, type});
        }
    };

    const handleAddRole = async (userId: number, role: string) => {
        try {
            await addRole(userId, role);
            const refreshedUsers = await allUsers();
            setUsers(refreshedUsers);

            if (searchResult) {
                const updatedUser = refreshedUsers.find(u => u.id === userId);
                if (updatedUser) {
                    setSearchResult(searchResult.map(u => u.id === userId ? updatedUser : u));
                }
            }
        } catch (error){
            console.error("Add role error:", error);
            alert("An error occurred while adding the role. Please try again.");
        }
    };

    const handleRemoveRole = async (userId: number, role: string) => {
        try {
            await removeRole(userId, role);
            const refreshedUsers = await allUsers();
            setUsers(refreshedUsers);
            alert(`${role} role removed successfully`);
        } catch (error) {
            console.error("Remove role error:", error);
            alert("An error occurred while removing the role. Please try again.");
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            await deleteUser(userId);
            const refreshedUsers = await allUsers();
            setUsers(refreshedUsers);
            if (searchResult) {
                setSearchResult(searchResult.filter(u => u.id !== userId));
            }
            alert("User deleted successfully");
        } catch (error) {
            console.error("Delete user error:", error);
            alert("An error occurred while deleting this user");
        }
    };

    let dataToDisplay: AdminDto[] = users;
    if (searchResult !== null && searchResult.length > 0) {
        dataToDisplay = searchResult;
    }

    return (
        <>
            <div className="flex">
                <div className="w-64 h-screen sticky top-0">
                    <DashboardSidebar/>
                </div>
                <div className="flex-1 p-6 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold">Admin Panel</h2>
                        <p className="text-gray-500">Manage users, teams, and competitions</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white rounded-lg shadow border p-4">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium">Total Users</h3>
                                <Users className="h-4 w-4 text-gray-500"/>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{users.length}</div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow border p-4">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium">Total Teams</h3>
                                <Users className="h-4 w-4 text-gray-500"/>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.totalTeams}</div>
                                <p className="text-xs text-gray-500">Across all competitions</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow border p-4">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium">Competitions</h3>
                                <Trophy className="h-4 w-4 text-gray-500"/>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{stats.totalCompetitions}</div>
                                <p className="text-xs text-gray-500">Active and upcoming</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow border p-4">
                            <div className="flex flex-row items-center justify-between pb-2">
                                <h3 className="text-sm font-medium">Platform Growth</h3>
                                <BarChart className="h-4 w-4 text-gray-500"/>
                            </div>
                            <div>
                                <div className="text-2xl font-bold">+12%</div>
                                <p className="text-xs text-gray-500">From last month</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="border-b border-gray-200">
                            <div className="grid w-full grid-cols-2">
                                <button
                                    onClick={() => setActiveTab("users")}
                                    className={`py-2 text-center font-medium text-sm ${
                                        activeTab === "users"
                                            ? "border-b-2 border-blue-500 text-blue-600"
                                            : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                                >
                                    Users
                                </button>
                            </div>
                        </div>

                        {activeTab === "users" && (
                            <div className="mt-6">
                                <div className="bg-white rounded-lg shadow border overflow-hidden">
                                    <div className="p-4 border-b">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-lg font-bold">All Users</h3>
                                                <p className="text-sm text-gray-500">Manage user roles and
                                                    permissions</p>
                                            </div>
                                            <div className="relative">
                                                <div
                                                    className="flex items-center border rounded-md px-3 py-2 bg-gray-50 gap-2.5">
                                                    <Search className="h-4 w-4 text-gray-400 mr-2"/>
                                                    <select
                                                        className="border px-2 py-1 rounded"
                                                        value={searchType}
                                                        onChange={(e) => setSearchType(e.target.value)}
                                                    >
                                                        <option value="id">By ID</option>
                                                        <option value="username">By Username</option>
                                                        <option value="firstname">By First Name</option>
                                                        <option value="lastname">By Last Name</option>
                                                    </select>
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        className="border px-2 py-1 rounded flex-1"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                    <button className="bg-blue-600 text-white px-4 py-1 rounded"
                                                            onClick={handleSearch}>
                                                        Search
                                                    </button>
                                                    <button
                                                        className="bg-gray-600 text-white px-4 py-1 rounded"
                                                        onClick={() => {
                                                            setSearchQuery("");
                                                            setSearchResult(null);
                                                        }}
                                                    >
                                                        Load All
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FirstName</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LastName</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
                                                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                {dataToDisplay.map((user) => (
                                                    <tr key={user.id} className="hover:bg-gray-50">
                                                        <td className="px-4 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div
                                                                    className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-gray-200">

                                                                    <img
                                                                        src={user.profileImage || "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1742582408~exp=1742586008~hmac=0bf2fb65f0cc0df4a0b903c1832dbf8fd63160e829d6488536e3a4866d2302cf&w=1060"}
                                                                        alt="Image"
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap font-medium">{user.firstName}</td>
                                                        <td className="px-4 py-4 whitespace-nowrap font-medium">{user.lastName}</td>
                                                        <td className="px-4 py-4">
                                                            <div className="flex flex-wrap gap-1">
                                                                {user.userRoles ? user.userRoles.map((role) => (
                                                                    <span
                                                                        key={role}
                                                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                                                                    >{role}</span>
                                                                )) : null}
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                                                            <button
                                                                onClick={(e) => toggleDropdown(user.id, "user", e)}
                                                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4"/>
                                                                <span className="sr-only">Open menu</span>
                                                            </button>
                                                            {dropdownOpen.id === user.id && dropdownOpen.type === "user" && (
                                                                <div
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                                    <div className="py-1">
                                                                        <button
                                                                            onClick={() => handleAddRole(user.id, "Admin")}
                                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                        >
                                                                            Add Admin Role
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleRemoveRole(user.id, "Admin")}
                                                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                        >
                                                                            Remove Admin Role
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteUser(user.id)}
                                                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                                        >
                                                                            Delete User
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}