import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useModal from "../hooks/useModal";

export const ProtectedRoute = (props: any) => {
  const { acl, ...rest } = props;
  const { authenticated, expired, checkAccess } = useAuth();
  const { closeAll } = useModal();
  const history = useHistory();

  useEffect(() => {
    // Close all modals on route changes
    closeAll();
    if (expired) {
      history.push("/logout", { unauthorized: true });
    }
  }, []);

  if (acl) {
    if (Array.isArray(acl)) {
      let canAccess = false;
      for (let acl_item of acl) {
        canAccess = checkAccess(acl_item);
        if (canAccess) break;
      }
      if (!canAccess) {
        return <Redirect to="/unauthorized" />;
      }
    } else {
      if (!checkAccess(acl)) {
        return <Redirect to="/unauthorized" />;
      }
    }
  }

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return <Route {...rest} />;
};
