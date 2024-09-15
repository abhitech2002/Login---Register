import axios from "axios";

const API = axios.create({
  baseURL: "https://login-register-backend-alpha.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Sign Up API
export const signUp = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reEnterPassword: string;
  contact: string;
}) => {
  return await API.post("/auth/signup", userData);
};

// Login API
export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return await API.post("/auth/login", credentials);
};

// Verify Otp
export const verifyOTP = async (email: string, otp: string) => {
  return await API.post("/auth/verify-otp", { email, otp });
};

export default API;
