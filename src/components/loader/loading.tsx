import { CircularProgress, Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  logo: {
    marginBottom: theme.spacing(1),
    width: "100%",
    height: "75px",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "360px",
    backgroundImage:
      theme.palette.type === "light"
        ? "url('logo_blue.png')"
        : "url('logo_white.png')",
  },
}));

export const Loading = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.logo}></div>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <CircularProgress />
      </div>
    </Container>
  );
};
