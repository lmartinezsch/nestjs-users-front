import React, { Suspense } from "react";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import { IconButton } from "@material-ui/core";
import { RCCThemeProvider } from "./context/RCCThemeProvider";
import { AuthProvider } from "./context/AuthProvider";
import { NotFound } from "./pages/notFound";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { AboutUs } from "./pages/aboutUs";
import history from "./services/history";
import { ProtectedRoute } from "./routes";
import { Logout } from "./components/logout";
import { ModalProvider } from "./context/ModalProvider";
import { Loading } from "./components/loader/loading";
import { Home } from "./pages/home";
//import { Registration } from "../../pages/registration";
import { Unauthorized } from "./pages/unauthorized";

function App() {
  const notistackRef: any = React.createRef();
  const onClickDismiss = (key: any) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <AuthProvider>
        <RCCThemeProvider>
          <Suspense fallback={<Loading />}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              iconVariant={{
                success: (
                  <CheckCircleOutlinedIcon style={{ marginRight: "5px" }} />
                ),
                error: <ErrorOutlineIcon style={{ marginRight: "5px" }} />,
                warning: (
                  <ReportProblemOutlinedIcon style={{ marginRight: "5px" }} />
                ),
                info: <InfoOutlinedIcon style={{ marginRight: "5px" }} />,
              }}
              ref={notistackRef}
              action={(key) => (
                <IconButton size="small" onClick={onClickDismiss(key)}>
                  <CloseOutlinedIcon
                    style={{
                      color: "#FFF",
                      fontSize: "14px",
                    }}
                  />
                </IconButton>
              )}
            >
              <ModalProvider>
                <Router history={history}>
                  <Switch>
                    <Route
                      exact
                      path="/login"
                      render={(props) => (
                        <Login {...props} title="The Lucky App" />
                      )}
                    />
                    <Route
                      exact
                      path="/about-us"
                      render={(props) => (
                        <AboutUs {...props} title="The Lucky App - About us" />
                      )}
                    />
                    <Route
                      exact
                      path="/register"
                      render={(props) => (
                        <Register {...props} title="The Lucky App - About us" />
                      )}
                    />
                    <Route
                      exact
                      path="/logout"
                      render={(props) => <Logout {...props} />}
                    />

                    <ProtectedRoute
                      exact
                      path="/"
                      render={(props: any) => (
                        <Home {...props} title="The Lucky App - Home" />
                      )}
                    />

                    <ProtectedRoute
                      exact
                      path="/unauthorized"
                      render={(props: any) => (
                        <Unauthorized
                          {...props}
                          title="The Lucky App - Acceso no autorizado"
                        />
                      )}
                    />
                    <Route path="/404" exact component={NotFound} />
                    <Redirect to="/404" />
                  </Switch>
                </Router>
              </ModalProvider>
            </SnackbarProvider>
          </Suspense>
        </RCCThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
