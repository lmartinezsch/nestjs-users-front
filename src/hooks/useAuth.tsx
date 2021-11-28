import { useCallback, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { doLogin, getProfile } from "../services/authService";
import { userLogout } from "../actions/user";
import { useDispatch } from "react-redux";
import moment from "moment";

interface Claims {
  customer: string;
  name: string;
  lastname: string;
  email: string;
  acl: string[];
  exp: number;
  iat: number;
}

interface ProfileResponse {
  id: string;
  name: string;
  addres: {
    street: string;
    city: string;
    country: string;
  };
}

export default function useAuth() {
  const { jwt, setJWT } = useContext(AuthContext);
  const { profile, setProfile } = useContext(AuthContext);
  const dispatch = useDispatch();

  const handleLogin = useCallback(
    (username: string, password: string) => {
      return new Promise((resolve, reject) => {
        doLogin({
          username,
          password,
        })
          .then((loginResponse: any) => {
            const { data } = loginResponse;
            setJWT(data.access_token);
            localStorage.setItem("jwt", data.access_token);
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    [setJWT]
  );

  const handleProfile = useCallback(() => {
    return new Promise((resolve, reject) => {
      getProfile()
        .then((profileResponse: any) => {
          const { data } = profileResponse;
          setProfile(JSON.stringify(data));
          localStorage.setItem("profile", JSON.stringify(data));
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }, [setProfile]);

  const handleLogout = useCallback(() => {
    return new Promise((resolve) => {
      setJWT("");
      localStorage.clear();
      dispatch(userLogout());
      resolve(true);
    });
  }, [dispatch, setJWT]);

  const getClaims = (jwt: any): Claims | null => {
    if (jwt) {
      try {
        return JSON.parse(atob(jwt.split(".")[1]));
      } catch (error) {
        // ignore
      }
    }
    return null;
  };

  const getUserFromToken = useCallback(() => {
    const token = profile;

    if (token) {
      return JSON.parse(token);
    }

    return null;
  }, [profile]);

  const isSessionExpired = useCallback(() => {
    if (jwt) {
      const claims = getClaims(jwt);
      if (claims === null) {
        return true;
      }
      const expiration = moment(claims.exp);

      return moment().unix() > expiration.valueOf();
    }
    return true;
  }, [jwt]);

  const checkAccess = useCallback(
    (role_or_view: string) => {
      const token = jwt;
      if (token) {
        const claims = getClaims(token);
        if (claims === null) {
          return false;
        }

        return claims.acl.includes(role_or_view);
      }

      return false;
    },
    [jwt]
  );

  return {
    handleLogin,
    handleProfile,
    handleLogout,
    checkAccess,
    authenticated: jwt !== "",
    userLogged: getUserFromToken(),
    expired: isSessionExpired(),
    currentUser: getClaims(jwt),
  };
}
