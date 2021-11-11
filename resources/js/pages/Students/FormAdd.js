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
        first_name: "",
        firstNameError: "",
        last_name: "",
        lastNameError: "",
        middle_name: "",
        middleNameError: "",

    });

    useEffect(() =>{
        if(reset_form){
            setstate({
                ...state,
                first_name: "",
                firstNameError: "",
                last_name: "",
                lastNameError: "",
                middle_name: "",
                middleNameError: "",
            });
        }
    },[reset_form])

    const submitForm = async event => {
        event.preventDefault();

        const firstNameError = UniversalValidator({
            value: state.first_name,
            isValidate: true,
            errorMsg: "First name is required."
        });

        const lastNameError = UniversalValidator({
            value: state.last_name,
            isValidate: true,
            errorMsg: "Last name is required."
        });

        const middleNameError = UniversalValidator({
            value: state.middle_name,
            isValidate: true,
            errorMsg: "Middle name is required."
        });
        

        if (firstNameError || lastNameError || middleNameError) {
            setstate({
                ...state,
                firstNameError: firstNameError,
                lastNameError: lastNameError,
                middleNameError: middleNameError,
            });
            return;
        }

        let params = {
            first_name: state.first_name,
            last_name: state.last_name,
            middle_name: state.middle_name,
        };
        submit_form(params);
    };

    // useEffect(() => {
    //     if (props.newCustomerSave) {
    //         setstate({
    //             //...state,
    //             org_name: "",
    //             orgError: "",
    //             org_address: "",
    //             orgAddressError: "",
    //         });
    //     }
    // }, [props]);



    // function submitForm(event){
    //   save_customer({event, state});
    // }



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
                <DialogTitle id="scroll-dialog-title">New Student</DialogTitle>
                <DialogContent dividers>
                    {is_submit ? <><CircleLoading loading_message="Saving student" /> </>: null} 
                    <form noValidate onSubmit={submitForm}>
                    <TextInput
                        name="first_name"
                        value={state.first_name}
                        type={"text"}
                        label="First Name"
                        placeholder="First Name"
                        helperText={""}
                        isError={state.firstNameError}
                        handleChange={event =>
                            setstate({
                                ...state,
                                first_name: event.target.value,
                                firstNameError: ""
                            })
                        }
                    />
                    <TextInput
                        name="last_name"
                        value={state.last_name}
                        type={"text"}
                        label="Last Name"
                        placeholder="Last Name"
                        helperText={""}
                        isError={state.lastNameError}
                        handleChange={event =>
                            setstate({
                                ...state,
                                last_name: event.target.value,
                                lastNameError: ""
                            })
                        }
                    />
                    <TextInput
                        name="middle_name"
                        value={state.middle_name}
                        type={"text"}
                        label="Middle Name"
                        placeholder="Middle Name"
                        helperText={""}
                        isError={state.middleNameError}
                        handleChange={event =>
                            setstate({
                                ...state,
                                middle_name: event.target.value
                            })
                        }
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
