import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Alerts from "../components/Alerts";
import Geolocation from "../components/Geolocation";
import Account from "../pages/Account";
import Charts from "../pages/Charts";
import Home from "../pages/Home";
import News from "../pages/News";
import Testing from "../pages/Testing";
import Vaccines from "../pages/Vaccines";

const ProtectedRoutes = () => (
    <>
        <Geolocation />
        <Alerts />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/news" exact component={News} />
            <Route path="/charts" exact component={Charts} />
            <Route path="/account" exact component={Account} />
            <Route path="/vaccines" exact component={Vaccines} />
            <Route path="/testing" exact component={Testing} />
            <Redirect from="*" to="/" />
        </Switch>
    </>
)

export default React.memo(ProtectedRoutes);