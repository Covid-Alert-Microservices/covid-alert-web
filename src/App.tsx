import { useKeycloak } from "@react-keycloak/web";
import { useCallback } from "react";

function App() {
  const { keycloak } = useKeycloak();

  const login = useCallback(() => {
    keycloak.login();
  }, [keycloak]);

  const logout = useCallback(() => {
    keycloak.logout();
  }, [keycloak]);

  return (
    <div>
      <h1>WIP: Covid Alert</h1>
      {keycloak.authenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}

export default App;
