import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './protected.routes';
import PublicRoutes from './public.routes';

const Routes = () => {
    const { keycloak } = useKeycloak();
    if (keycloak.authenticated) return <ProtectedRoutes />;
    return <PublicRoutes />;
};

const Router = () => (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
)

export default Router;
