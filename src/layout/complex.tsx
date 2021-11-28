import React, { useCallback, useState } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core";
import { Header } from "../components/header";
import { Menu } from "../components/menu";
import { Helmet } from "react-helmet";
import { Route } from "react-router";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      width: "100%",
    },
    content: {
      overflow: "auto",
      marginTop: theme.mixins.toolbar.height,
      width: "100%",
      height: `calc(100vh - ${theme.mixins.toolbar.height}px)`,
    },
    breadcrums: {
      "& a": {
        textDecoration: "none",
        color: theme.palette.text.primary,
        fontWeight: 500,
        "&:hover": {
          textDecoration: "none",
        },
      },
    },
  });

export const withComplexLayout = (WrappedComponent: any) => {
  const WrapperComplex = (props: any) => {
    const { classes, title } = props;
    const [open, setOpen] = useState(false);

    const toggleMenu = useCallback(() => {
      const newOpen = !open;
      setOpen(newOpen);
    }, [open, setOpen]);

    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <div className={classes.wrapper}>
          <Header toggleMenu={toggleMenu} />
          <Menu oppened={open} />
          <div className={classes.content}>
            <Route></Route>
            <WrappedComponent {...props} />
          </div>
        </div>
      </>
    );
  };

  return withStyles(styles)(WrapperComplex);
};
