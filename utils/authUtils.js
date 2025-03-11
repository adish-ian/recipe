export const isAuthenticated = () => {
    const authToken = localStorage.getItem('auth_token');
    return !!authToken; // Returns true if authToken exists, false otherwise
  };