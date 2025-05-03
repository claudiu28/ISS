import {useState} from "react"
import IAuthentication from "./interfaces/IAuthentication.ts";

const Navbar = ({onLogin, onSignup}: IAuthentication) => {
    const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
    return (
        <>
            <nav className="bg-white sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <a href="#" className="flex-shrink-0 flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-blue-400"
                                >
                                    <path
                                        d="M4.5 9.5V5.5C4.5 4.4 5.4 3.5 6.5 3.5H18.5C19.6 3.5 20.5 4.4 20.5 5.5V9.5"/>
                                    <path
                                        d="M4.5 14.5V18.5C4.5 19.6 5.4 20.5 6.5 20.5H18.5C19.6 20.5 20.5 19.6 20.5 18.5V14.5"/>
                                    <path d="M9 12H15"/>
                                    <path d="M12 9V15"/>
                                </svg>
                                <span
                                    className="ml-2 text-xl font-bold text-gray-900">IHealth</span>
                            </a>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <a href="#"
                                   className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</a>
                                <a href="#"
                                   className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Nutrition</a>
                                <a href="#"
                                   className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Competitions</a>
                                <a href="#"
                                   className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Features</a>
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
                            <button
                                id="login-button"
                                onClick={onLogin}
                                className="px-4 py-2 text-sm font-medium text-blue-600 rounded-md hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Log In
                            </button>
                            <button
                                id="signup-button"
                                onClick={onSignup}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isBurgerMenuOpen ? (
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
                                        <path d="M18 6 6 18"/>
                                        <path d="m6 6 12 12"/>
                                    </svg>
                                ) : (
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
                                        className="lucide lucide-menu"
                                    >
                                        <line x1="4" x2="20" y1="12" y2="12"/>
                                        <line x1="4" x2="20" y1="6" y2="6"/>
                                        <line x1="4" x2="20" y1="18" y2="18"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {isBurgerMenuOpen && (<div className="sm:hidden">
                        <div className="pt-2 pb-3 space-y-1">
                            <a href="#"
                               className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Home</a>
                            <a href="#"
                               className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Nutrition</a>
                            <a href="#"
                               className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Competition</a>
                            <a href="#"
                               className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Features</a>
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex justify-center items-center px-4 space-x-3">
                                <button onClick={() => {
                                    setIsBurgerMenuOpen(false);
                                    onLogin()
                                }}
                                        className="block px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800">Log In
                                </button>
                                <button onClick={() => {
                                    setIsBurgerMenuOpen(false);
                                    onSignup()
                                }}
                                        className="block px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-800">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}
export default Navbar;