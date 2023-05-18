import { createContext, useState, ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  auth: any;
  setAuth: any;
};

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState(() => {
    const storedUsernameOrEmail = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const expiration = localStorage.getItem("expiration");
    const expirationTime = expiration ? Date.parse(expiration) : null;

    if (
      storedUsernameOrEmail &&
      storedRole &&
      expirationTime &&
      expirationTime < Date.now()
    ) {
      return {
        usernameOrEmail: storedUsernameOrEmail,
        role: storedRole,
      };
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("expiration");
      return {
        usernameOrEmail: "",
        role: "",
      };
    }
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
