import { useKeycloak } from "@react-keycloak/web";
import { useCallback } from "react";

const Login = () => {
    const { keycloak } = useKeycloak();

    const login = useCallback(() => {
        keycloak.login();
    }, [keycloak]);

    const logout = useCallback(() => {
        keycloak.logout();
    }, [keycloak]);

    return <p>Login</p>
}

export default Login;