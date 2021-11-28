import client from "./apiService";

interface LoginRequest {
  username: string;
  password: string;
}

export const doLogin = (request: LoginRequest) => {
  return client.post("auth/login", request);
};

export const getProfile = () => {
  const token = localStorage.getItem("jwt");
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return client.get("users/profile", config);
};

export const refreshToken = () => {
  return client.post("/refresh");
};
