import React, { useState } from "react";
import Button from "./Button";

interface SignInModalProps {
  isVisible: boolean;
  handleClose: () => void;
  onSignUp: () => void;
}

const LoginModal: React.FC<SignInModalProps> = ({
  isVisible = false,
  handleClose,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black bg-opacity-70"
      onClick={() => handleClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10"
      >
        <div className="self-center mb-4 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Login To Your Account
        </div>
        <div className="mt-8">
          <form action="#" autoComplete="off">
            <div className="flex flex-col mb-2">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 45.532 45.532"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22.766,0.001C10.194,0.001,0,10.193,0,22.766s10.193,22.765,22.766,22.765c12.574,0,22.766-10.192,22.766-22.765 S35.34,0.001,22.766,0.001z M22.766,6.808c4.16,0,7.531,3.372,7.531,7.53c0,4.159-3.371,7.53-7.531,7.53 c-4.158,0-7.529-3.371-7.529-7.53C15.237,10.18,18.608,6.808,22.766,6.808z M22.761,39.579c-4.149,0-7.949-1.511-10.88-4.012 c-0.714-0.609-1.126-1.502-1.126-2.439c0-4.217,3.413-7.592,7.631-7.592h8.762c4.219,0,7.619,3.375,7.619,7.592 c0,0.938-0.41,1.829-1.125,2.438C30.712,38.068,26.911,39.579,22.761,39.579z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="sign-in-username"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-8">
              <div className="flex relative ">
                <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  id="sign-in-email"
                  className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full mb-4">
              <Button type={"submit"} onClick={() => handleClose()}>
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="justify-center text-sm text-center text-gray-500 flex-items-center dark:text-gray-400">
          <button
            onClick={(e) => console.log(e)}
            className="inline-flex items-center text-sm font-thin text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white hover:underline"
          >
            <span className="ml-2">You don't have an account?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
