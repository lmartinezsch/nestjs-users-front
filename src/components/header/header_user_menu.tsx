import React, { useEffect, useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import useAuth from "../../hooks/useAuth";
import { Divider, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  userInfo: {
    lineHeight: 1,
    textAlign: "right",
    padding: "10px 15px 0",
  },
  userDivider: {
    margin: "10px 0 0",
  },
}));

export const UserMenu = () => {
  const { handleLogout, userLogged } = useAuth();
  const classes = useStyles();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const logout = () => {
    handleLogout();
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    return () => {
      //closeAll();
    };
  }, []);

  return (
    <>
      <IconButton
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
        ref={anchorRef}
      >
        <AccountCircleOutlinedIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <div className={classes.userInfo}>
                    <p>{userLogged?.user}</p>
                    <small>{userLogged?.email}</small>
                  </div>
                  <Divider className={classes.userDivider} />
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={logout}>Log out</MenuItem>
                  </MenuList>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
