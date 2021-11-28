import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness2OutlinedIcon from "@material-ui/icons/Brightness2Outlined";
import BrightnessLowOutlinedIcon from "@material-ui/icons/BrightnessLowOutlined";

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { UserMenu } from "./header_user_menu";
import useAppTheme from "../../hooks/useAppTheme";
import { ProgressBar } from "../loader";
import { useRouteMatch, withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  itemMenu: {
    paddingLeft: "12px",
    border: "none !important",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark + " !important",
      border: "none !important",
      paddingLeft: "12px",
    },
  },
  userInfo: {
    lineHeight: 1,
    textAlign: "right",
  },
}));

export const Header = withRouter((props: any) => {
  const classes = useStyles();
  const { darkTheme, setDarkTheme, lightTheme, setLightTheme } = useAppTheme();

  const IsSelected = (routePath: string, exact: boolean = true) => {
    return useRouteMatch({
      path: routePath,
      exact: exact,
    }) !== null
      ? true
      : false;
  };

  const { toggleMenu, history } = props;

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => toggleMenu()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            The Lucky APP
          </Typography>

          <List
            component="nav"
            aria-labelledby="main navigation"
            className={classes.navDisplayFlex}
          >
            <a onClick={() => history.push("/")} className={classes.linkText}>
              <ListItem
                button
                classes={{ root: classes.itemMenu }}
                selected={IsSelected("/", true)}
              >
                <ListItemText primary="home" />
              </ListItem>
            </a>
            <a
              onClick={() => history.push("/about-us")}
              className={classes.linkText}
            >
              <ListItem
                button
                classes={{
                  root: classes.itemMenu,
                }}
                selected={IsSelected("/inteligencia/", false)}
              >
                <ListItemText primary="About us" />
              </ListItem>
            </a>
          </List>
          <Divider
            orientation="vertical"
            flexItem
            style={{ margin: "0 10px" }}
          />

          <div className="controls">
            <UserMenu />
          </div>
        </Toolbar>
        <ProgressBar />
      </AppBar>
    </>
  );
});
