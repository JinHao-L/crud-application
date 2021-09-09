import { getCurrentUser } from "../services/authService";

export const authHeader = (): HeadersInit => {
  // return authorization header with jwt token
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
};
