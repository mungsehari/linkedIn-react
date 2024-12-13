import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../../../components/loader/loader";

interface User {
  id: string;
  email: string;
  emailVerified: boolean;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const isOnAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/request-password-reset";

  const login = async (email: string, password: string) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      setUser({ id: "", email, emailVerified: false });
    } else {
      const { message } = await response.json();
      throw new Error(message);
    }
  };
  const signup = async (email: string, password: string) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      setUser({ id: "", email, emailVerified: false });
    } else {
      const { message } = await response.json();
      throw new Error(message);
    }
  };
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Authentication failed");
      }
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      return;
    }
    fetchUser();
  }, [user, location.pathname]);

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && !user && !isOnAuthPage) {
    return <Navigate to="/login" replace />;
  }
  if (user && user.emailVerified && isOnAuthPage) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {user && !user.emailVerified ? (
        <Navigate to="/verify-email" replace />
      ) : null}
      <Outlet />
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
