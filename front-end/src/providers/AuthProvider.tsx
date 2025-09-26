import { useAuth } from "@clerk/clerk-react";
import { createContext, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AuthContext = createContext({});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getToken } = useAuth();
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        } catch (error) {
          if (
            error.message?.includes("auth") ||
            error.message?.includes("token")
          ) {
            toast.error("Authentication error, please login again");
          }
          console.error("Error fetching token", error);
          return config; // vẫn return config để request không bị chặn
        }
      },
      (error) => {
        return Promise.reject(error); // fallback nếu interceptor lỗi
      }
    );

    // cleanup khi component unmount
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [getToken]);


  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
