import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  buttonColor = "purple",
  textColor = "white",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ color: textColor }}
      className={`py-2 px-4 bg-${buttonColor}-600 hover:bg-${buttonColor}-700 focus:ring-${buttonColor}-500 focus:ring-offset-${buttonColor}-200 text-${textColor} transition ease-in duration-200 text-center text-base shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg my-auto w-full`}
    >
      {children}
    </button>
  );
};

export default Button;
