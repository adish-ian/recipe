export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false; // Avoid accessing localStorage in SSR
  }
  return !!localStorage.getItem("auth_token");
};
