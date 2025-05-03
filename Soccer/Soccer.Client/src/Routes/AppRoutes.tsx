import {Routes, Route, Navigate} from "react-router-dom";
import { LandingPage } from "../Pages/landing";
import HomePage from "../Pages/home";
import { useAuth } from "../Hooks/useAuth";
import ProfilePage from "../Pages/profile.tsx";
import TeamsPage from "../Pages/teams.tsx";
import AdminPage from "../Pages/admin.tsx";
import CompetitionsPage from "../Pages/cumpetitions.tsx";
import FeedPage from "../Pages/feed.tsx";

export default function AppRoutes() {
    const { token } = useAuth();

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/home" /> : <LandingPage />} />
            <Route path="/home" element={token ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/" />} />
            <Route path="/teams" element={token ? <TeamsPage /> : <Navigate to="/" />} />
            <Route path="/admin" element={token ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="/competitions" element={token ? <CompetitionsPage/> : <Navigate to="/" />} />
            <Route path="/feed" element={token ? <FeedPage/> : <Navigate to="/" />} />
        </Routes>
    );
}