import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../Hooks/useAuth.tsx";

function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { logout, user } = useAuth();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent): void {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
            <div className="flex items-center gap-2">
                <Link to="/home" className="flex items-center gap-2">
                    <div>
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
                            <path d="M4.5 9.5V5.5C4.5 4.4 5.4 3.5 6.5 3.5H18.5C19.6 3.5 20.5 4.4 20.5 5.5V9.5" />
                            <path d="M4.5 14.5V18.5C4.5 19.6 5.4 20.5 6.5 20.5H18.5C19.6 20.5 20.5 19.6 20.5 18.5V14.5" />
                            <path d="M9 12H15" />
                            <path d="M12 9V15" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-900">IHealth</span>
                </Link>
            </div>
            <div className="flex items-center gap-4 relative">
                <button
                    ref={buttonRef}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-md px-2 py-1"
                >
                    Welcome,{user?.username}
                </button>

                {isDropdownOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    >
                        <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            My Profile
                        </Link>
                        <button
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                            onClick={() => {
                                setIsDropdownOpen(false);
                                logout().then();
                            }}
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;