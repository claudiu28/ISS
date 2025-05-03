import IAuthentication from "./interfaces/IAuthentication.ts";
import headerImage from "../../Images/header.webp";

const Header = ({ onSignup }: IAuthentication) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center w-full overflow-hidden px-4 md:px-8 lg:px-12">
                <div className="w-full md:w-1/2 p-4 md:p-6">
                    <h1 className="text-blue-800 text-xl md:text-4xl font-bold">
                        IHealth
                    </h1>
                    <p className="text-gray-700 text-xs md:text-lg mt-2">
                        Discover how proper nutrition can enhance your performance on the field.
                        Follow personalized plans for athletes and learn how to maximize your energy.
                        Take part in exclusive competitions and push your limits to reach the top!
                    </p>
                    <div className="mt-5 flex space-x-4">
                        <button
                            onClick={() => onSignup()}
                            className="px-6 py-3 text-white bg-green-400 hover:bg-green-500 rounded-md shadow-md"
                        >
                            Sign Up
                        </button>
                        <button
                            className="px-6 py-3 text-white bg-orange-300 hover:bg-orange-400 rounded-md shadow-md"
                        >
                            See more
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 md:p-6 flex justify-center">
                    <img
                        src={headerImage}
                        alt="Header Image"
                        className="w-full max-w-md h-80 object-cover rounded-lg shadow-lg border border-gray-200"
                    />
                </div>
            </div>
        </div>
    )};

export default Header;
