export const TOKEN_KEY = "@myApi";
export const isAuthenticated = () => localStorage.getItem(`${TOKEN_KEY}:token`) !== null;
export const getToken = () => localStorage.getItem(`${TOKEN_KEY}:token`);
export const getEmail = () => localStorage.getItem(`${TOKEN_KEY}:email`);
export const login = (token, email) => {
  localStorage.setItem(`${TOKEN_KEY}:token`, token);
  localStorage.setItem(`${TOKEN_KEY}:email`, email);

};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};