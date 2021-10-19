import Keycloack from "keycloak-js";

export const keycloak = Keycloack({
  clientId: "webapp",
  realm: "covid-alert",
  url: process.env.REACT_APP_KEYCLOAK_URL,
});
