import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
type credentialsTypes = {
  email: string;
  password: string;
};
export const logingUser = async (credentials: credentialsTypes) => {
  const response = await axios.post(`${API_URL}/api/users/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const signingUser = async (credentials: credentialsTypes) => {
  const response = await axios.post(
    `${API_URL}/api/users/signin`,
    credentials,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/api/users/logout`, {}, { withCredentials: true });
};

export const fetchUser = async () => {
  const response = await axios.get(`${API_URL}/api/users/login`, {
    withCredentials: true,
  });
  return response.data;
};

export const sendToBot = async (message: string) => {
  const response = await axios.post(
    `${API_URL}/api/chat`,
    { message },
    {
      withCredentials: true,
    },
  );
  console.log(response.data.content);
  return response.data.content;
};
