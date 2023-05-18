import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { UserAccount, UserProfile, UserRegistration } from "../models/User";

export const checkEmailExists = (email: string) => {
  return axios.get(`${BACKEND_API_URL}/users/email-exists/?email=${email}`, {
    withCredentials: true,
  });
};

export const checkUsernameExists = (username: string) => {
  return axios.get(
    `${BACKEND_API_URL}/users/username-exists/?username=${username}`,
    { withCredentials: true }
  );
};

export const register = (formData: UserRegistration) => {
  return axios.post(`${BACKEND_API_URL}/register/`, formData, {
    withCredentials: true,
  });
};

export const login = (usernameOrEmail: string, password: string) => {
  return axios.post(
    `${BACKEND_API_URL}/login/`,
    {
      user: usernameOrEmail,
      password: password,
    },
    {
      withCredentials: true,
    }
  );
};

export const logout = () => {
  return axios.post(
    `${BACKEND_API_URL}/logout/`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getAccount = () => {
  return axios.get<UserProfile>(`${BACKEND_API_URL}/account/`, {
    withCredentials: true,
  });
};

export const updateAccount = (formData: UserAccount) => {
  return axios.put(`${BACKEND_API_URL}/account/`, formData, {
    withCredentials: true,
  });
};

export const getUserInformationDetails = () => {
  return axios.get(`${BACKEND_API_URL}/user/role/`, { withCredentials: true });
};

export const cancelUserAccount = () => {
  return axios.delete(`${BACKEND_API_URL}/account/cancel/`, {
    withCredentials: true,
  });
};
