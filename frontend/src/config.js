export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://notekeeper-3219.herokuapp.com"
    : "http://localhost:5000";
