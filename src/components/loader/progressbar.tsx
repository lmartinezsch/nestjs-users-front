import React from "react";
import { LinearProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

export const ProgressBar = () => {
  const showBar = useSelector((state: any) => state.api.requests > 0);

  return showBar ? <LinearProgress variant="indeterminate" /> : <></>;
};
