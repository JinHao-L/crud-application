import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUpModal from "./components/SignUpModal";
import HomePage from "./pages/HomePage";
import Button from "./components/Button";

import "./styles/App.css";
import LoginModal from "./components/LoginModal";

const App: React.FC = () => {
  const [isSignUpVisible, toggleSignUpVisibile] = useState(false);
  const [isSignInVisible, toggleSignInVisibile] = useState(false);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-200">
      <Header
        rightComponent={
          <div className="flex w-30">
            <Button onClick={() => toggleSignInVisibile(true)}>Sign In</Button>
          </div>
        }
      />
      <SignUpModal
        isVisible={isSignUpVisible}
        handleClose={() => toggleSignUpVisibile(false)}
        onHaveAccount={() => {
          toggleSignInVisibile(true);
          toggleSignUpVisibile(false);
        }}
      />
      <LoginModal
        isVisible={isSignInVisible}
        handleClose={() => toggleSignInVisibile(false)}
        onSignUp={() => {
          toggleSignUpVisibile(true);
          toggleSignInVisibile(false);
        }}
      />
      <HomePage />
      <Footer />
    </div>
  );
};

export default App;
