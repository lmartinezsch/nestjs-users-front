import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  jwt: "",
  setJWT: (_jwt: string) => {},
  profile: "",
  setProfile: (_jwt: string) => {},
});

export function AuthProvider({ children }: any) {
  const [initialized, setInitialized] = useState(false);
  const [jwt, setJWT] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    if (!initialized) {
      const jwt = localStorage.getItem("jwt");
      const profile = localStorage.getItem("profile");
      setJWT(jwt != null ? jwt : "");
      setProfile(profile != null ? profile : "");

      setInitialized(true);
    }
  }, [initialized, setJWT, setProfile, setInitialized]);

  return (
    <AuthContext.Provider value={{ jwt, setJWT, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
