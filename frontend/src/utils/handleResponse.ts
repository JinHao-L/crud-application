import { logout } from "../services/authService";

export const handleResponse = (response: Response): any => {
  return response.json().then((data) => {
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 Unauthorized response returned from api
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
