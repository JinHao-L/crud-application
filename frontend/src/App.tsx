import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignUpModal from "./components/SignUpModal";
import HomePage from "./pages/HomePage";
import Button from "./components/Button";
import LoginModal from "./components/LoginModal";
import { getCurrentUser, logout, userDetails } from "./services/authService";

import "./styles/App.css";

const App: React.FC = () => {
  const [isSignUpVisible, toggleSignUpVisibile] = useState(false);
  const [isSignInVisible, toggleSignInVisibile] = useState(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user.username);
    }
  }, []);

  const onSignIn = (user: userDetails) => {
    if (user) {
      setUsername(user.username);
    }
  };

  const signOut = () => {
    logout();
    return setUsername("");
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-200">
      <Header
        rightComponent={
          username ? (
            <div className="flex w-30">
              <Button onClick={() => signOut()}>Sign out</Button>
            </div>
          ) : (
            <div className="flex w-30">
              <Button onClick={() => toggleSignInVisibile(true)}>
                Sign In
              </Button>
            </div>
          )
        }
      />
      {isSignUpVisible && (
        <SignUpModal
          handleClose={() => toggleSignUpVisibile(false)}
          onClickHaveAccount={() => {
            toggleSignInVisibile(true);
            toggleSignUpVisibile(false);
          }}
          completionCallback={onSignIn}
        />
      )}
      {isSignInVisible && (
        <LoginModal
          handleClose={() => toggleSignInVisibile(false)}
          onClickSignUp={() => {
            toggleSignUpVisibile(true);
            toggleSignInVisibile(false);
          }}
          completionCallback={onSignIn}
        />
      )}
      <HomePage username={username} />
      <Footer />
    </div>
  );
};

export default App;
