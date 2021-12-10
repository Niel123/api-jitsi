import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import TopContent from "../../components/PagesParts/TopContent";
import FormAdd from "./FormAdd";
import Table from "./Table";
import Snackbar from '@material-ui/core/Snackbar';
import Api from "../../utils/api";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

class Schools extends Component {
    constructor() {
        super();
        this.state = {
            new_student: false,
            refresh_table: false,
            is_submit: false,
            reset_form: false,
            openSnackbar: false,
        };
    }

    componentWillMount() {
        //this.props.fetchCustomers();
        //this.props.createCustomer(params);
    }

    open_addForm() {
       // this.props.openFormAdd();
    }

    save_form(form){ 
        const dataTOSubmit = {
            room_name: form.room_name,
            room_link: process.env.MIX_JITSI_URL + form.room_name
        };
        this.setState({is_submit: true})
        Api.conferenceSave(dataTOSubmit)
            .then(result => {
                const { data } = result;
                if (data.result) {
                    if (data.exist) {
                        this.setState({
                            openSnackbar: true,
                            is_submit: false,
                        })
                        return;
                    }
                    setTimeout(() => {
                        this.setState({ refresh_table: true, new_student: false, is_submit: false, reset_form: true })
                    }, 1000)
                }
            })
            .catch(error => {
                this.setState({ is_submit: false })
            });
    }

 
    render() {

        const { new_student, refresh_table, is_submit, reset_form, openSnackbar } = this.state;

        return (
            <React.Fragment>
                <TopContent
                    newCustomer={() => this.setState({new_student: true})}
                    title="Conferences"
                    btn="New Conference"
                />
                <FormAdd
                    open={new_student}
                    is_submit={is_submit}
                    reset_form={reset_form}
                    submit_form={data => this.save_form(data)}
                    close={() => this.setState({ new_student: false })}
                />
                <Box style={{ padding: 30 }}>
                    <Table refresh={refresh_table} />
                </Box>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => this.setState({openSnackbar: false})}
                >
                    <Alert severity="error">
                        Room name already exist! Please select another one.
                    </Alert>
                </Snackbar>
            </React.Fragment>
        );
    }
}


export default Schools;
