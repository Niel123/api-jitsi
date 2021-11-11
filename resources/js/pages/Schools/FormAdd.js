import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircleLoading from '../../components/CircleLoading';
import Button from '@material-ui/core/Button';
import TextInput from "../../components/TextInput";
import { UniversalValidator } from "../../utils/helper";




function FormAdd({open, close, submit_form, is_submit, reset_form}) {
   
    const [state, setstate] = useState({
        org_name: "",
        orgError: "",
        org_address: "",
        orgAdressError: "",

    });

    useEffect(() =>{
        if(reset_form){
            setstate({
                ...state,
                org_name: "",
                orgError: "",
                org_address: "",
                orgAdressError: "",
            });
        }
    },[reset_form])

    const submitForm = async event => {
        event.preventDefault();

        const orgError = UniversalValidator({
            value: state.org_name,
            isValidate: true,
            errorMsg: "Organization name is required."
        });
        const orgAddressError = UniversalValidator({
            value: state.org_address,
            isValidate: true,
            errorMsg: "Organization address is required."
        });
        if (orgError || orgAddressError) {
            setstate({
                ...state,
                orgError: orgError,
                orgAddressError: orgAddressError
            });
            return;
        }

        let params = {
            org_name: state.org_name,
            org_address: state.org_address
        };

        submit_form(params);
    };


    return (
        <React.Fragment>
            <Dialog
                open={open}
                maxWidth={'sm'}
                fullWidth={true}
                onClose={close}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">New Organization</DialogTitle>
                <DialogContent dividers>
                    {is_submit ? <><CircleLoading loading_message="Saving student" /> </>: null} 
                    <form noValidate onSubmit={submitForm}>
                    <TextInput
                        name="org_name"
                        value={state.name}
                        type={"text"}
                        label="Organization"
                        placeholder="Organization Name"
                        helperText={""}
                        isError={state.orgError}
                        handleChange={event =>
                            setstate({
                                ...state,
                                org_name: event.target.value,
                                orgError: ""
                            })
                        }
                    />
                    <TextInput
                        name="org_address"
                        value={state.name}
                        type={"text"}
                        label="Organization"
                        placeholder="Organization   Address"
                        helperText={""}
                        isError={state.orgAddressError}
                        handleChange={event =>
                            setstate({
                                ...state,
                                org_address: event.target.value,
                                orgAddressError: ""
                            })
                        }
                        multiline={true}
                        rows={4}
                    />
                </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                    Cancel
                    </Button>
                    <Button  variant="contained"  onClick={submitForm} color="primary" disabled={is_submit} >
                    Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default FormAdd;
