import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const Authmiddleware = ({ component: Component, layout: Layout }) => (
    <Route
        exact
        render={(props) => {
            //    if (!getCookie("userDetails")) {
            // 	if(props.location.pathname !== '/ticket-extension'){
            // 		return (
            // 			<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            // 		);
            // 	}else{
            // 		window.location.hrefreset_form = `login?next=${window.location.href}`;
            // 	}

            // }

            return (
                <Layout>
                    <Component {...props} />
                </Layout>
            );
        }}
    />
);

export default withRouter(Authmiddleware);
