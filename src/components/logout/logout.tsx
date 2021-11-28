import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export const Logout = (props: any) => {
  const { handleLogout } = useAuth();
  const { location, history } = props;
  const { enqueueSnackbar } = useSnackbar();
  const unauthorized = location.state ? location.state.unauthorized : false;

  useEffect(() => {
    if (unauthorized) {
      enqueueSnackbar(
        <span
          dangerouslySetInnerHTML={{ __html: "Access denied<br/>The session has expired or you don't have the necessary permissions" }}
        ></span>,
        { variant: "error" }
      );
    }
    handleLogout().then(() => {
      history.push("/login");
    });
  }, [enqueueSnackbar, handleLogout, unauthorized]);

  return <></>;
};
