import { apiUrl } from "../config";
import { handleResponse } from "../utils/handleResponse";

interface userDetails {
  username: string;
  uid: string;
  token: string;
}

export const getCurrentUser = (): userDetails => {
  return JSON.parse(localStorage.getItem("user") || "null") as userDetails;
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

  const response = await fetch(`${apiUrl}/login`, requestOptions);
  const user = await handleResponse(response);
  // store user details and jwt token in local storage to keep user logged in
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
};
