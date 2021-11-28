import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withComplexLayout } from "../../layout";
import { Typography, Divider } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  main: {
    flexGrow: 1,
    padding: "15px",
  },
  grid: {
    "& div[class^='makeStyles-card']": {
      marginTop: 0,
    },
  },
  dividerMargin: {
    margin: "10px 0 0",
  },
}));

export const Home = withComplexLayout(() => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h6" gutterBottom>
        Dashboard
      </Typography>
      <Divider className={classes.dividerMargin} />
      Welcome
    </div>
  );
});
