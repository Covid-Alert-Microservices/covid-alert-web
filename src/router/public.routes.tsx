import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Charts from "../pages/Charts";
import Home from "../pages/Home";
import News from "../pages/News";

const PublicRoutes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" exact component={News} />
        <Route path="/charts" exact component={Charts} />
        <Redirect from="*" to="/" />
    </Switch>
)

export default React.memo(PublicRoutes);