import React from "react";
import { createStyles, withStyles } from "@material-ui/core";
import { Helmet } from 'react-helmet'

const styles = () =>
  createStyles({
    wrapper: {},
    content: {},
  });

export const withSimpleLayout = (WrappedComponent: any) => {

  const WrapperSimple = ({ 
    classes, title, ...props 
  }: { [key: string]: any }) => {

    return (
      <>
        <Helmet>
          <title>{ title }</title>
        </Helmet>
        <div className={classes.wrapper}>
          <div className={classes.content}>
            <WrappedComponent {...props} />
          </div>
        </div>
      </>
    );
  };

  return withStyles(styles)(WrapperSimple);
};
