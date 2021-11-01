import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { AuthClientTokens } from "@react-keycloak/core";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { keycloak } from "./keycloack";
import DefaultLayout from "./layout";
import reportWebVitals from "./reportWebVitals";
import Router from "./router";
import { store } from "./store";
import { tokensRefreshed } from "./store/api/credentials";
import { useAppDispatch } from "./store/hooks";
import theme from "./theme";


const TokensSyncer = (props: React.PropsWithChildren<{}>) => {
  const dispatch = useAppDispatch();

  const onTokens = useCallback(
    (tokens: AuthClientTokens) => {
      dispatch(
        tokensRefreshed({
          accessToken: tokens.token || null,
          refreshToken: tokens.refreshToken || null,
        })
      );
    },
    [dispatch]
  );

  return (
    <ReactKeycloakProvider authClient={keycloak} onTokens={onTokens}>
      {props.children}
    </ReactKeycloakProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <TokensSyncer>
        <ThemeProvider theme={theme}>
          <DefaultLayout>
            <Router />
          </DefaultLayout>
        </ThemeProvider>
      </TokensSyncer>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
