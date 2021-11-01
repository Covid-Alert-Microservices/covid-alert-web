import { Home } from "@mui/icons-material";
import { Redirect, Route, Switch } from "react-router-dom";

const ProtectedRoutes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Redirect from="*" to="/" />
    </Switch>
)

export default ProtectedRoutes;