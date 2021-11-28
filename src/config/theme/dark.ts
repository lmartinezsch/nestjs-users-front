import { createMuiTheme } from "@material-ui/core";

const defaultTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

export const darkTheme = createMuiTheme({
  typography: {
    fontFamily: ["Quicksand", "Roboto"].join(",") + " !important",
  },
  palette: {
    type: "dark",
    primary: {
      main: "#0077c8",
      light: "#5ba5fb",
      dark: "#004c97",
    },
    secondary: {
      main: "#e57200",
      light: "#ffa23f",
      dark: "#ac4400",
    },
  },
  mixins: {
    toolbar: {
      height: 48,
    },
  },
  overrides: {
    MuiMenuItem: {
      root: {
        fontSize: "1rem",
        [defaultTheme.breakpoints.up("md")]: {
          fontSize: "0.89rem",
        },
      },
    },
    MuiBreadcrumbs: {
      root: {
        padding: "16px 20px",
        background: "#424242",
        borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
      },
    },
    MuiTypography: {
      body1: {
        fontSize: "0.9rem",
        lineHeight: "1.3",
      },
    },
    MuiSvgIcon: {
      root: {
        fontSize: "1.4rem",
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          borderLeft: "4px solid #0077c8",
          paddingLeft: "12px",
        },
        "&:hover": {
          backgroundColor: "rgba(133, 89, 235, 0.1)",
          borderLeft: "4px solid #5ba5fb",
          paddingLeft: "12px",
        },
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: "40px",
      },
    },

    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#333",
      },
    },
    MuiToolbar: {
      root: {
        color: "#FFF",
      },
      gutters: {
        [defaultTheme.breakpoints.up("sm")]: {
          paddingLeft: "18px",
          paddingRight: "18px",
        },
      },
    },
  },
});
