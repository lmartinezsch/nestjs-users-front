import client from "./apiService";

interface LoginRequest {
  username: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  address: string;
  cityId: number;
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

export const userRegister = (request: RegisterRequest) => {
  console.log(request);
  return client.post("auth/register", request);
};

export const refreshToken = () => {
  return client.post("/refresh");
};
