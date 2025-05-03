import './App.css'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Provider/AuthProvider.tsx";
import AppRoutes from "./Routes/AppRoutes.tsx";
import {ProfileProvider} from "./Provider/ProfileProvider.tsx";
import {AdminProvider} from "./Provider/AdminProvider.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <AdminProvider>
                            <AppRoutes/>
                        </AdminProvider>
                    </ProfileProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App
