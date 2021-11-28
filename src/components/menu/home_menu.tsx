import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";
import DashboardIcon from "@material-ui/icons/Dashboard";

export const HomeMenu = (props: any) => {
  const { history, oppened } = props;

  const IsSelected = (routePath: string, exact: boolean = true) => {
    return useRouteMatch({
      path: routePath,
      exact: exact,
    }) !== null
      ? true
      : false;
  };

  return (
    <>
      <List>
        <ListItem
          button
          selected={IsSelected("/", true)}
          onClick={() => history.push("/")}
        >
          <ListItemIcon>
            <DashboardIcon
              aria-label="Dashboard"
              titleAccess={!oppened ? "Dashboard" : ""}
            />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
    </>
  );
};
