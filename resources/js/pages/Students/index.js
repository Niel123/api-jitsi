import React, { Component } from "react";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import {
    fetchCustomers,
    createCustomer,
    openFormAdd,
    new_customer_item_add,
    newCustomerSaveClose
} from "../../actions/StudentsActions";
import TopContent from "../../components/PagesParts/TopContent";
import FormAdd from "./FormAdd";
import Table from "./Table";
import { new_product, new_product_btn } from "../../utils/consts";
import Api from "../../utils/api";

class Students extends Component {
    constructor() {
        super();
        this.state = {
            new_student: false,
            refresh_table: false,
            is_submit: false,
            reset_form: false,
        };
    }

    componentWillMount() {
        //this.props.fetchCustomers();
        //this.props.createCustomer(params);
    }

    open_addForm() {
       // this.props.openFormAdd();
    }

    save_student(form){
        this.setState({is_submit: true})
        Api.studentSave(form)
        .then(result => {
           setTimeout(()=>{
              this.setState({refresh_table: true, new_student: false, is_submit: false, reset_form: true})
           },1000)
        })
        .catch(error => {
            this.setState({is_submit: false})
        });
    }

 
    render() {

        const { new_student, refresh_table, is_submit, reset_form } = this.state;

        return (
            <React.Fragment>
                <TopContent
                    newCustomer={() => this.setState({new_student: true})}
                    title="Students"
                    btn="New Student"
                />
                <FormAdd
                    open={new_student}
                    is_submit={is_submit}
                    reset_form={reset_form}
                    submit_form={data => this.save_student(data)}
                    close={() => this.setState({new_student: false})}
                />
                <Box style={{ padding: 30 }}>
                    <Table refresh={refresh_table}  />
                </Box>
            </React.Fragment>
        );
    }
}


export default Students;
