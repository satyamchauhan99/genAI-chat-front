import axios from "@utils/axiosInstance";

interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export const signup = async (payload: AuthPayload) => {
  const res = await axios.post("/auth/signup", payload);
  return res.data;
};

export const login = async (payload: AuthPayload) => {
  const res = await axios.post("/auth/login", payload);
  return res.data;
};
