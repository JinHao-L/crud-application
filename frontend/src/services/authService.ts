import { apiUrl } from "../config";
import { handleResponse } from "../utils/handleResponse";

export interface userDetails {
  username: string;
  token: string;
}

export const getCurrentUser = (): userDetails => {
  return JSON.parse(localStorage.getItem("session") || "null") as userDetails;
};

export const login = async (
  username: string,
  password: string
): Promise<userDetails> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const response = await fetch(`${apiUrl}/auth/login`, requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in
  localStorage.setItem("session", JSON.stringify(user));
  return user;
};

export const register = async (
  username: string,
  password: string
): Promise<userDetails> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  const regResponse = await fetch(`${apiUrl}/auth/signup`, requestOptions);
  const regStatus = await handleResponse(regResponse);
  console.log(regStatus);
  // store user details and jwt token in local storage to keep user logged in
  return login(username, password);
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("session");
};
