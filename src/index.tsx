import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { AuthClientTokens } from "@react-keycloak/core";
import { keycloak } from "./keycloack";
import { useAppDispatch } from "./store/hooks";
import { tokensRefreshed } from "./store/api/credentials";

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
    <Provider store={store}>
      <TokensSyncer>
        <App />
      </TokensSyncer>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
