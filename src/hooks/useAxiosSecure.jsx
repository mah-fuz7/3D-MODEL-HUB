import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

// Create Axios instance
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // console.log(user?.accessToken)

  useEffect(() => {
    // Request interceptor
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;

        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    const responseInterceptor = instance.interceptors.response.use(
      (response) => {
        console.log(response)
        return response;
      },
      async (error) => {
        console.log(error)
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          console.log("Unauthorized or Forbidden");

          try {
            await logout();
            navigate("/login");
          } catch (err) {
            console.error(err);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup function
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user,logout, navigate]);

  return instance;
};

export default useAxiosSecure;