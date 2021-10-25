import Box from "@material-ui/core/Box";
import React from "react";
import App from "./App";
import Login from "./Login";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright @ "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render(){
        return (
            <div>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/">
                                <App/>
                            </Route>
                        </Switch>
                    </div>
                    <Box mt={5}>
                        
                    </Box>
                </Router>
            </div>
        );
    }
}

export default AppRouter;