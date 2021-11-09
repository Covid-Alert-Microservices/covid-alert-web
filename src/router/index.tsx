import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layout';
import ProtectedRoutes from './protected.routes';
import PublicRoutes from './public.routes';

const Routes = () => {
    const { keycloak } = useKeycloak();
    if (keycloak.authenticated) return <ProtectedRoutes />;
    return <PublicRoutes />;
};

const Router = () => (
    <BrowserRouter>
        <DefaultLayout>
            <Routes />
        </DefaultLayout>
    </BrowserRouter>
)

export default Router;
