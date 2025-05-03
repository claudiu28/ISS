import Header from "../Components/landing/header.tsx";
import Main from "../Components/landing/main.tsx";
import Footer from "../Components/landing/footer.tsx";
import Navbar from "../Components/landing/navbar.tsx";
import {useState} from "react";
import {ModalsLogIn, ModalsSignUp} from "../Components/landing/modals.tsx";

export const LandingPage = () => {
    const [isLogInOpen, setIsLogInOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    return (
        <>
            <Navbar onLogin={() => setIsLogInOpen(true)} onSignup={() => setIsSignInOpen(true)} />
            <Header onLogin={() => setIsLogInOpen(true)} onSignup={() => setIsSignInOpen(true)} />
            <Main onLogin={() => setIsLogInOpen(true)} onSignup={() => setIsSignInOpen(true)}/>
            <Footer/>
            {isLogInOpen && (<ModalsLogIn onClose = {() => {setIsLogInOpen(false)}}/>)}
            {isSignInOpen && (<ModalsSignUp onClose={() => {setIsSignInOpen(false)}}/>)}
        </>
    );

};