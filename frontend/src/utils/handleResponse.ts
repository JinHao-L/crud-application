import { logout } from "../services/authService";

export const handleResponse = (response: Response): any => {
  return response.json().then((data) => {
    if (!response.ok) {
      console.log(data)
      if ([401, 403].includes(response.status)) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }
      console.log(data)
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};
