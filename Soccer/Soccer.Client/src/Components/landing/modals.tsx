import ICloseModal from "./interfaces/CloseModal";
import {useAuth} from "../../Hooks/useAuth.tsx";
import * as React from "react";
import AuthService from "../../Services/AuthService.ts"
export const ModalsLogIn = ({ onClose }: ICloseModal) => {
    const {login} = useAuth();
    const handleLogin = async (event : React.FormEvent) => {
        event.preventDefault();
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;

        try{
            const {data} = await AuthService.login(username, password);
            if (data && data.username && data.token) {
                await login(
                    data.token,
                    data.username,
                    data.roles
                );
            }
            onClose();


        }catch (error){
            console.error(error);
        }
    }
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your username is..."
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="•••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
                    >
                        LogIn
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => {
                                onClose()
                                setTimeout(() => document.getElementById("signup-button")?.click(), 100)
                            }} className="font-medium text-blue-600 hover:text-red-700">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export const ModalsSignUp = ({ onClose }: ICloseModal) => {
    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const verifyPassword = (document.getElementById("verifyPassword") as HTMLInputElement).value;

        try {
            await AuthService.register(username, password, verifyPassword);
            onClose();
            setTimeout(() => document.getElementById("login-button")?.click(), 100);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>



                <form className="space-y-4"  onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Your username is..."
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="•••••••••"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="verifyPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Verify Password
                        </label>
                        <input
                            type="password"
                            id="verifyPassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="•••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:bg-blue-400"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        You have an account?{" "}
                        <button
                            onClick={() => {
                                onClose()
                                setTimeout(() => document.getElementById("login-button")?.click(), 100)
                            }} className="font-medium text-blue-600 hover:text-red-700">
                            Log In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};