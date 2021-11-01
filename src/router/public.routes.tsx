import { Redirect, Route, Switch } from "react-router";
import Home from "../pages/Home";

const PublicRoutes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Redirect from="*" to="/" />
    </Switch>
)

export default PublicRoutes;