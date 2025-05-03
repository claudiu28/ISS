import Header from "../Components/dashboards/header.tsx";
import Sidebar from "../Components/dashboards/sidebar.tsx";
import { Trophy, Users, Rss, Activity } from "lucide-react";

const HomePage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header/>
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="bg-white rounded-lg shadow p-4 border">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Teams</h3>
                                    <Users className="h-4 w-4 text-gray-500"/>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">3</div>
                                    <p className="text-xs text-gray-500">My teams</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-4 border">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Competitions</h3>
                                    <Trophy className="h-4 w-4 text-gray-500"/>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">2</div>
                                    <p className="text-xs text-gray-500">My competitions</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-4 border">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Recipes</h3>
                                    <Activity className="h-4 w-4 text-gray-500"/>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">5</div>
                                    <p className="text-xs text-gray-500">My recipes</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-4 border">
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <h3 className="text-sm font-medium">Posts</h3>
                                    <Rss className="h-4 w-4 text-gray-500"/>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-gray-500">My posts</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-4 border md:col-span-2">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium">Last Competitions Participated</h3>
                                    <p className="text-sm text-gray-500">Your recent competitions: </p>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                                            <div className="rounded-full bg-blue-100 p-2">
                                                <Users className="h-4 w-4 text-blue-600"/>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">
                                                    User participated in competition...
                                                </p>
                                                <p className="text-xs text-gray-500">Start date:</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Matches Card */}
                            <div className="bg-white rounded-lg shadow p-4 border md:col-span-2">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium">Last Teams Participated</h3>
                                    <p className="text-sm text-gray-500">Your recent teams: </p>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                                            <div className="rounded-full bg-blue-100 p-2">
                                                <Users className="h-4 w-4 text-blue-600"/>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">
                                                    User participated in team...
                                                </p>
                                                <p className="text-xs text-gray-500">Start date:</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4 border md:col-span-2">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium">User Posts</h3>
                                    <p className="text-sm text-gray-500">Your posts: </p>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                                            <div className="rounded-full bg-blue-100 p-2">
                                                <Users className="h-4 w-4 text-blue-600"/>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">
                                                    User posts...
                                                </p>
                                                <p className="text-xs text-gray-500">Start date:</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow p-4 border md:col-span-2">
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium">User recipes</h3>
                                    <p className="text-sm text-gray-500">The last recipes built by you</p>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                                            <div className="rounded-full bg-blue-100 p-2">
                                                <Trophy className="h-4 w-4 text-blue-600"/>
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium">Recipe</p>
                                                <p className="text-xs text-gray-500">March {20 + i}, 2025 - 18:00</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default HomePage;