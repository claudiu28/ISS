import {Link} from "react-router-dom";
import {Trophy, Calendar, Users, Search} from "lucide-react";
import DashboardSidebar from "../Components/dashboards/sidebar.tsx";

export default function CompetitionsPage() {
    const competitions = [
        {
            id: 1,
            name: "National Basketball League",
            type: "League",
            startDate: "March 15, 2025",
            status: "Active",
            teams: 12,
            description: "Professional basketball league with teams from across the country",
        },
        {
            id: 2,
            name: "Regional Cup",
            type: "Cup",
            startDate: "April 5, 2025",
            status: "Registration",
            teams: 8,
            description: "Knockout tournament for teams in the eastern region",
        },
        {
            id: 3,
            name: "City Championship",
            type: "League",
            startDate: "May 10, 2025",
            status: "Upcoming",
            teams: 6,
            description: "Local league for teams within the metropolitan area",
        },
        {
            id: 4,
            name: "Summer Tournament",
            type: "Tournament",
            startDate: "June 20, 2025",
            status: "Registration",
            teams: 16,
            description: "Annual summer tournament with group stages and knockout rounds",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-green-100 text-green-800";
            case "Registration":
                return "bg-blue-100 text-blue-800";
            case "Upcoming":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    return (
        <>
            <div className="flex">
                <div className="w-64 h-screen sticky top-0">
                    <DashboardSidebar/>
                </div>

                <div className="flex-1 p-6 space-y-6">
                    <div className="space-y-6">
                        <div className="flex justify-between">
                            <h2 className="text-2xl font-bold">Competitions</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400"/>
                            </div>
                            <input
                                type="text"
                                placeholder="Search teams by name or description..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {competitions.map((competition) => (
                                <div key={competition.id} className="bg-white rounded-lg shadow border overflow-hidden">
                                    <div className="p-4 border-b">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="text-lg font-medium">{competition.name}</h3>
                                                <p className="text-sm text-gray-500">{competition.description}</p>
                                            </div>
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(competition.status)}`}>
                  {competition.status}
                </span>
                                        </div>
                                    </div>
                                    <div className="p-4 border-b">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Trophy className="h-4 w-4 text-gray-500"/>
                                                <span className="text-sm">Type: {competition.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-gray-500"/>
                                                <span className="text-sm">Start Date: {competition.startDate}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="h-4 w-4 text-gray-500"/>
                                                <span className="text-sm">{competition.teams} teams enrolled</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <Link
                                            to={`/competitions/${competition.id}`}
                                            className="w-full inline-flex justify-center text-white items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        >
                                            Enroll Competition
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
