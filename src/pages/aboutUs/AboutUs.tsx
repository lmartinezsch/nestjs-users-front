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

export const AboutUs = withComplexLayout(() => {
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Typography variant="h6" gutterBottom>
        About us
      </Typography>
      <Divider className={classes.dividerMargin} />
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu accumsan
      erat. Ut finibus scelerisque est, eget accumsan justo condimentum aliquam.
      Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec non
      dictum felis, nec ullamcorper purus. Nam aliquet nisl sed neque elementum,
      ac mattis ligula fermentum. Pellentesque suscipit augue ut quam porta,
      finibus imperdiet quam aliquet. Nulla ultrices nulla in sapien cursus
      blandit. Ut id risus at justo scelerisque cursus sit amet vitae odio.
      Etiam sollicitudin rutrum lacus. Interdum et malesuada fames ac ante ipsum
      primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus
      et ultrices posuere cubilia curae; Nulla gravida mauris semper sem
      pulvinar sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      <br />
      <br />
      Vestibulum nisl mi, tincidunt sit amet nulla in, cursus consectetur quam.
      Duis scelerisque nulla et diam sodales, in accumsan ipsum sollicitudin.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc pharetra
      eleifend lorem sit amet euismod. Maecenas id placerat ipsum, euismod
      suscipit nisl. Aliquam id tincidunt augue. Integer blandit gravida
      pellentesque. Nulla at nisl nisl. Vestibulum lectus eros, finibus id
      hendrerit ac, tempor nec quam. Praesent auctor sapien at elit ultricies,
      nec varius tellus pellentesque. Sed euismod tellus dolor, in molestie
      ligula tempus vel. Sed dolor risus, tristique vel mauris at, aliquet
      mattis massa. Aliquam nunc diam, bibendum efficitur magna nec, dignissim
      ullamcorper erat. Proin vitae felis nec neque convallis euismod a vel
      justo. Nulla facilisi. Sed tempor vitae magna nec dapibus. Vestibulum
      interdum suscipit massa a vestibulum. Etiam sollicitudin et sapien vel
      blandit.
    </div>
  );
});
