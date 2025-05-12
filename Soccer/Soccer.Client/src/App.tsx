import './App.css'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Provider/AuthProvider.tsx";
import AppRoutes from "./Routes/AppRoutes.tsx";
import {ProfileProvider} from "./Provider/ProfileProvider.tsx";
import {AdminProvider} from "./Provider/AdminProvider.tsx";
import {RecipeProvider} from "./Provider/RecipeProvider.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ProfileProvider>
                        <RecipeProvider>
                        <AdminProvider>
                            <AppRoutes/>
                        </AdminProvider>
                        </RecipeProvider>
                    </ProfileProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
}

export default App
