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
        class_name: "",
        classNameError: "",

    });

    useEffect(() =>{
        if(reset_form){
            setstate({
                ...state,
                class_name: "",
                classNameError: "",
            });
        }
    },[reset_form])

    const submitForm = async event => {
        event.preventDefault();

        const classNameError = UniversalValidator({
            value: state.class_name,
            isValidate: true,
            errorMsg: "Class name is required."
        });
        if (classNameError) {
            setstate({
                ...state,
                classNameError: classNameError,
            });
            return;
        }

        let params = {
            class_name: state.class_name,
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
                <DialogTitle id="scroll-dialog-title">New Class</DialogTitle>
                <DialogContent dividers>
                    {is_submit ? <><CircleLoading loading_message="Saving student" /> </>: null} 
                    <form noValidate onSubmit={submitForm}>
                    <TextInput
                        name="class_name"
                        value={state.class_name}
                        type={"text"}
                        label="Class Name"
                        placeholder="Class Name"
                        helperText={""}
                        isError={state.classNameError}
                        handleChange={event =>
                            setstate({
                                ...state,
                                class_name: event.target.value,
                                orgError: ""
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
