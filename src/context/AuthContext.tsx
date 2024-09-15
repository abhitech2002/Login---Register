import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Loader from "../components/Common/Loader";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (
    token: string,
    user: { firstName: string; lastName: string; email: string }
  ) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (
    token: string,
    user: { firstName: string; lastName: string; email: string }
  ) => {
    setToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("firstName", user.firstName);
    localStorage.setItem("lastName", user.lastName);
    localStorage.setItem("email", user.email);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("email");
  };

  const decodeJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
 };

  useEffect(() => {
  const savedToken = localStorage.getItem("authToken");
  if (savedToken) {
    const expiry = decodeJwt(savedToken)?.exp;
    if (expiry && Date.now() > expiry * 1000) {
      logout();
    } else {
      setToken(savedToken);
    }
  }
  setIsLoading(false);
}, []);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, logout, isLoading }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
