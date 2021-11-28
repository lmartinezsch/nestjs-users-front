import React from "react";
import { makeStyles, createStyles, Drawer } from "@material-ui/core";
import clsx from "clsx";
import { withRouter, Switch } from "react-router-dom";
import { ProtectedRoute } from "../../routes";
import { HomeMenu } from "./home_menu";

const drawerWidth = 260;

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: "100%",
      maxWidth: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },

    drawerContainer: {
      marginTop: theme.mixins.toolbar.height,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(8) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7) + 1,
      },
    },
  })
);

export const Menu = withRouter((props: any) => {
  const classes = useStyles();
  const { oppened } = props;

  return (
    <Drawer
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: oppened,
        [classes.drawerClose]: !oppened,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: oppened,
          [classes.drawerClose]: !oppened,
        }),
      }}
      variant="permanent"
    >
      <div className={classes.drawerContainer}>
        <Switch>
          <ProtectedRoute
            path="/"
            exact
            render={(props: any) => <HomeMenu oppened={oppened} {...props} />}
          />
        </Switch>
      </div>
    </Drawer>
  );
});
