import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { withSimpleLayout } from "../../layout";
import Link from "@material-ui/core/Link";

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

export const Unauthorized = withSimpleLayout((props: any) => {
  const { history } = props;
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md" className={classes.container}>
      <div className={classes.logo}></div>
      <div style={{ margin: "0 auto", textAlign: "center" }}>
        <Typography variant="h3">Access unauthorized</Typography>
        <Typography variant="subtitle2">
        Contact administrators to request access
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to Home
        </Link>
      </div>
    </Container>
  );
});
