import { Link } from "react-router-dom";
import { Users, Plus, Search, UserPlus } from "lucide-react";
import { useState } from "react";
import DashboardSidebar from "../Components/dashboards/sidebar.tsx";
import avatar1 from "../Images/avatar1.webp";
import avatar2 from "../Images/default.webp";
import avatar3 from "../Images/avatar3.webp";
import avatar4 from "../Images/avatar4.webp";


export default function TeamsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const teams = [
        {
            id: 1,
            name: "Team Alpha",
            description: "Professional basketball team competing in national leagues",
            logo: avatar1,
            members: 12,
            isAdmin: true,
            canEnroll: false,
        },
        {
            id: 2,
            name: "Team Beta",
            description: "Amateur football team focused on local competitions",
            logo: avatar2,
            members: 18,
            isAdmin: false,
            canEnroll: true,
        },
        {
            id: 3,
            name: "Team Gamma",
            description: "Semi-professional volleyball team with regional presence",
            logo: avatar3,
            members: 10,
            isAdmin: true,
            canEnroll: false,
        },
        {
            id: 4,
            name: "Team Delta",
            description: "Youth basketball development team for under-18 players",
            logo: avatar4,
            members: 15,
            isAdmin: false,
            canEnroll: true,
        },
    ];

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <div className="flex">
            <div className="w-64 h-screen sticky top-0">
                <DashboardSidebar/>
            </div>

            <div className="flex-1 p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Teams</h2>
                    <button
                        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Plus className="h-4 w-4 mr-2"/>
                        Create Team
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search teams by name or description..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTeams.map((team) => (
                        <div key={team.id} className="bg-white rounded-lg shadow border overflow-hidden">
                            <div className="bg-orange-200 p-4">
                                <div className="flex justify-center">
                                    <img
                                        src={team.logo}
                                        alt={team.name}
                                        width={80}
                                        height={80}
                                        className="rounded-full border-4 border-white"
                                    />
                                </div>
                            </div>
                            <div className="p-4 border-b">
                                <h3 className="text-lg font-medium text-center">{team.name}</h3>
                                <p className="text-sm text-gray-500 text-center mt-1">{team.description}</p>
                            </div>
                            <div className="p-4 border-b">
                                <div className="flex items-center justify-center gap-2">
                                    <Users className="h-4 w-4 text-gray-500"/>
                                    <span className="text-sm text-gray-500">{team.members} members</span>
                                </div>
                            </div>
                            <div className="p-4 flex gap-2 flex-wrap">
                                <Link
                                    to={`/teams/${team.id}`}
                                    className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    View Team
                                </Link>
                                {team.isAdmin && (
                                    <Link
                                        to={`/teams/${team.id}/edit`}
                                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Edit Team
                                    </Link>
                                )}
                                {team.canEnroll && (
                                    <button
                                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <UserPlus className="h-4 w-4 mr-2"/>
                                        Enroll
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredTeams.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No teams found matching your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}