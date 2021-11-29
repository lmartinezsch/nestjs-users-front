import React, { useState } from "react";
import {
  CircularProgress,
  InputAdornment,
  makeStyles,
  Paper,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import TextFormatIcon from "@material-ui/icons/TextFormat";

import KeyChain from "mdi-material-ui/KeyChain";

import { withSimpleLayout } from "../../layout";
import { RegisterErrors, RegisterForm } from "./interfaces";
import { Formik } from "formik";
import useAuth from "../../hooks/useAuth";
import { useSnackbar } from "notistack";

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
    height: "50px",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "300px",
    backgroundImage:
      theme.palette.type === "light"
        ? "url('logo_blue.png')"
        : "url('logo_white.png')",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3, 2),
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(4, 0, 2),
  },
  register: {
    margin: theme.spacing(0, 0, 0),
  },
  loading: {
    color: "#FFF",
  },
}));

const initialValues: RegisterForm = {
  username: "",
  password: "",
  name: "",
  address: "",
  cityId: 1,
};

export const Register = withSimpleLayout((props: any) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { handleRegister } = useAuth();
  const { history } = props;
  const [sendingCredentials, setSendingCredentials] = useState(false);

  const validateForm = (values: RegisterForm) => {
    const errors: RegisterErrors = {};
    if (!values.username) {
      errors.username = "validation.emailRequired";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
    ) {
      errors.username = "validation.emailInvalid";
    }
    if (!values.password) {
      errors.password = "validation.passwordRequired";
    }
    return errors;
  };

  const submitRegister = (values: RegisterForm) => {
    setSendingCredentials(true);
    handleRegister(
      values.username,
      values.password,
      values.name,
      values.address,
      values.cityId
    )
      .then(() => {
        setSendingCredentials(false);
        enqueueSnackbar("User created", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        history.push("/");
      })
      .catch(() => {
        setSendingCredentials(false);
        enqueueSnackbar("Invalid User/Password", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h6">
          Register
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={submitRegister}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              <TextField
                disabled={sendingCredentials}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={values.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={sendingCredentials}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyChain color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={sendingCredentials}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={values.name}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextFormatIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={sendingCredentials}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                value={values.address}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextFormatIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                disabled={true}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                autoFocus
                value="1"
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextFormatIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={sendingCredentials}
              >
                {sendingCredentials ? (
                  <CircularProgress size={24} className={classes.loading} />
                ) : (
                  <>Register</>
                )}
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
      <Box mt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <a color="inherit" href="https://thelucky.app/">
            Lucky S.A
          </a>
          {" 2021."}
        </Typography>
      </Box>
    </Container>
  );
});
