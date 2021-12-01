import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/scss/custom-style.scss";

import { teal } from "@material-ui/core/colors";


import { authRoutes, userRoutes, noLayoutRoutes } from "./routes/allRoutes";

import NonAuthLayout from "./components/NonAuthLayout";

import NoLayout from "./components/NoLayout";

import Authmiddleware from "./routes/middleware/Authmiddleware";

import Layout from "./components/VerticalLayout/";

import AlertNotification from "./components/AlertNotification";

const outerTheme = createMuiTheme({
    palette: {
        primary: {
            main: teal[500],
        },
    },
});

// <Route exact path="/" render={() => <Login />} />
// <Route exact path="/stores" render={() => <StoreList />} />

const NonAuthmiddleware = ({ component: Component, layout: Layout }) => (
    <Route
        exact
        render={(props) => {
            return (
                <Layout>
                    <Component {...props} />
                </Layout>
            );
        }}
    />
);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={outerTheme}>
                    <AlertNotification />
                    <Router>
                        <Switch>
                            {/* <Route exact path="/store" render={() => <StoreList />} /> */}
                            {userRoutes.map((route, idx) => (
                                <Authmiddleware
                                    path={route.path}
                                    layout={Layout}
                                    component={route.component}
                                    key={idx}
                                />
                            ))}
                            {authRoutes.map((route, idx) => (
                                <NonAuthmiddleware
                                    path={route.path}
                                    layout={NonAuthLayout}
                                    component={route.component}
                                    key={idx}
                                />
                            ))}

                            {noLayoutRoutes.map((route, idx) => (
                                <NonAuthmiddleware
                                    path={route.path}
                                    layout={NoLayout}
                                    component={route.component}
                                    key={idx}
                                />
                            ))}
                        </Switch>
                    </Router>
                </ThemeProvider>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
