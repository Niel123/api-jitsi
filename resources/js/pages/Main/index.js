import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { getCookie } from "../../utils/helper";

class MainComponent extends Component {
    constructor() {
        super();
        this.state = {
            //newCustomer: false
        };
    }

    render() {
        if(getCookie('userLogin')){
            window.location.href = "/organizations";
        }else{
            window.location.href = "/login";
        }
      
        return (
            <React.Fragment>
                <h1>main</h1>
            </React.Fragment>
        );
    }
}

export default MainComponent;
