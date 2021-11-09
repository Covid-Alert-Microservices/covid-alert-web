import { Home } from "@mui/icons-material";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Charts from "../pages/Charts";
import News from "../pages/News";

const ProtectedRoutes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" exact component={News} />
        <Route path="/charts" exact component={Charts} />
        <Redirect from="*" to="/" />
    </Switch>
)

export default React.memo(ProtectedRoutes);