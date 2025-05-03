import champLeague from '../../Images/champ_league.webp'
import premierLeague from '../../Images/premier_league.webp'
import worldCup from '../../Images/world_cup.webp'
import IAuthentication from "./interfaces/IAuthentication.ts";

const Main = ({onSignup}:IAuthentication) => {
    return (
        <>
            <section id="nutrition" className="py-16 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Nutrition</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Fuel your potential
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Discover nutritional plans specifically designed for different sports disciplines and goals.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {nutritionFeatures.map((feature) => (
                                <div key={feature.name} className="relative">
                                    <div
                                        className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                                        <div className="h6 w-6">
                                            <feature.icon aria-hidden="true"/>
                                        </div>
                                    </div>
                                    <div className="ml-16">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                                        <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section id="competitions" className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Competitions</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Push your limits
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Explore a variety of competitions and design your own. Strategics different scenarios,
                            assemble
                            your dream squads, and experience what it takes to compete at a world-class level.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-8 sm:space-y-12 ">
                            {competitions.map((competition, index) => (
                                <div key={competition.title}
                                     className={`flex flex-col md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""} items-center `}>
                                    <div className="md:w-1/2 aspect-w-16 aspect-h-9">
                                        <img
                                            className="h-64 w-full object-contain rounded-2xl rounded-lg shadow-lg sm:h-72 md:h-96 lg:h-80"
                                            src={competition.image}
                                            alt={competition.title}
                                        />
                                    </div>
                                    <div className="mt-6 md:mt-0 md:w-1/2 md:px-8 flex flex-col items-center">
                                        <h3 className="text-2xl font-bold text-gray-900">{competition.title}</h3>
                                        <p className="mt-3 text-lg text-gray-500">{competition.description}</p>
                                        <div className="mt-4">
                                            <span
                                                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mr-2">
                                              {competition.date}
                                            </span>
                                            <span
                                                className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                              {competition.location}
                                            </span>
                                        </div>
                                        <div className="mt-5">
                                            <a href="#"
                                               className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">More
                                                information
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-100">
                <div
                    className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-extrabold text-slate-600 text-center">
                        Ready to build your competition or health plan?
                    </h2>
                    <div className="mt-8 flex flex-col lg:flex-row lg:flex-shrink-0 items-center">
                        <div className="inline-flex rounded-md shadow">
                            <button onClick={onSignup}
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-400 bg-white hover:bg-orange-100">
                                Sign Up
                            </button>
                        </div>
                        <div className="mt-3 lg:mt-0 lg:ml-3 inline-flex rounded-md shadow">
                            <a href="#"
                               className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-300 hover:bg-orange-500">
                                Learn more
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
const competitions = [
    {
        title: "UEFA Champions League",
        description:
            "Europe’s most prestigious club football tournament, where the top teams from across the continent compete for glory. Witness intense match, legendary performances, and unforgettable moments.",
        image: champLeague,
        date: "September 2025 - June 2026",
        location: "Various stadiums across Europe",
    },
    {
        title: "FIFA World Cup",
        description:
            "The biggest football competition in the world, bringing together the best national teams to compete for the ultimate prize. Experience thrilling matches, international rivalries, and unforgettable history-making moments.",
        image: worldCup,
        date: "November 2026 - December 2026",
        location: "USA, Canada & Mexico",
    },
    {
        title: "Premier League",
        description:
            "One of the most competitive football leagues globally, featuring elite clubs from England. Follow the drama, rivalries, and spectacular goals as teams battle for the championship title.",
        image: premierLeague,
        date: "August 2025 - May 2026",
        location: "Various stadiums across England",
    },
];
const nutritionFeatures = [
    {
        name: "Your personal recipes",
        description: "Nutritional plans tailored to your specific needs, sports goals, and food preferences.",
        icon: (props: object) => (
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
                {...props}
            >
                <path
                    d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
    },
    {
        name: "Discover new amazing recipes",
        description: "Access to certified sports nutritionists who will guide you every step of the way to success.",
        icon: (props: object) => (
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
                {...props}
            >
                <path d="M15 11h.01" />
                <path d="M11 15h.01" />
                <path d="M16 16h.01" />
                <path d="m2 16 20 6-6-20A20 20 0 0 0 2 16" />
                <path d="M5.71 17.11a17.04 17.04 0 0 1 11.4-11.4" />
            </svg>
        ),
    },
    {
        name: "Update your knowledge",
        description: "Library of recipes from all users around the world help you to became a champion.",
        icon: (props: object) => (
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
                {...props}
            >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        name: "Start learning ingredients and innovate your recipe",
        description: "Adjust your plan and stay on track toward your goals.",
        icon: (props: object) => (
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
                {...props}
            >
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
    },
]



export default Main;