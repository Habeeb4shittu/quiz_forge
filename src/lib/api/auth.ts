import axios from "axios";

export const signup = async (data: {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}) => {
  const res = await axios.post("/api/auth/signup", data);
  return res.data;
};

export const login = async (data: { email: string; password: string }) => {
  const res = await axios.post("/api/auth/login", data);
  return res.data;
};

export const logout = async () => {
  const res = await axios.get("/api/auth/logout");
  return res.data;
};
