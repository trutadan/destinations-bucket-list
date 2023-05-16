import { createContext, useState, ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

type authContextType = {
  auth: any;
  setAuth: any;
};

const AuthContext = createContext({} as authContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
