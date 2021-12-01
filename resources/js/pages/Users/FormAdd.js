import React, { useState, useEffect } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircleLoading from '../../components/CircleLoading';
import Button from '@material-ui/core/Button';
import TextInput from "../../components/TextInput";
import Select from "../../components/Select";
import { UniversalValidator } from "../../utils/helper";




function FormAdd({ open, close, submit_form, is_submit, reset_form, update_data }) {

    const [state, setstate] = useState({
        first_name: "",
        firstNameError: "",
        last_name: "",
        lastNameError: "",
        password: "",
        passwordError: "",
        email: "",
        emailError: "",
        role: "",
        roleError: "",
    });

    useEffect(() => {
        if (reset_form) {
            setstate({
                ...state,
                first_name: "",
                firstNameError: "",
                last_name: "",
                lastNameError: "",
                password: "",
                passwordError: "",
                email: "",
                emailError: "",
                role: "",
                roleError: "",
            });
        }
        if(update_data.id) {
            const arr_name = update_data.name.split(' ');
            const f_name = arr_name[0];
            let l_name = '';
            if (arr_name.length > 1) {
                arr_name.splice(0, 1);
                l_name = arr_name.toString().replace(/,/g, " ");
            }

            setstate({
                ...state,
                first_name: f_name,
                last_name: l_name,
                email: update_data.email,
                role: update_data.role,
            });
        }
    }, [reset_form, update_data])

    const roleList = [
        { name: 'Admin', value: 1 },
        { name: 'Instructor', value: 2 },
        { name: 'Super Admin', value: 3 },
        { name: 'Org Admin', value: 4 },
    ]

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
        const passwordError = UniversalValidator({
            value: state.password,
            isValidate: true,
            errorMsg: "Password is required."
        });
        const emailError = UniversalValidator({
            value: state.email,
            isValidate: true,
            errorMsg: "Email is required."
        });
        const roleError = UniversalValidator({
            value: state.role,
            isValidate: true,
            errorMsg: "Role is required."
        });

        if (
            firstNameError || lastNameError ||
            passwordError || emailError || roleError
            ) {
            setstate({
                ...state,
                firstNameError: firstNameError,
                lastNameError: lastNameError,
                passwordError: passwordError,
                emailError: emailError,
                roleError: roleError,
            });
            return;
        }

        let params = {
            name: `${state.first_name} ${state.last_name}`,
            password: state.password,
            email: state.email,
            role: state.role,
        };
        if(update_data.id) params.id = update_data.id;
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
                <DialogTitle id="scroll-dialog-title">New User</DialogTitle>
                <DialogContent dividers>
                    {is_submit ? <><CircleLoading loading_message="Saving user" /> </> : null}
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
                            name="email"
                            value={state.email}
                            type={"email"}
                            label="Email"
                            placeholder="Email"
                            helperText={""}
                            isError={state.emailError}
                            handleChange={event =>
                                setstate({
                                    ...state,
                                    email: event.target.value
                                })
                            }
                        />
                        <TextInput
                            name="password"
                            value={state.password}
                            type={"text"}
                            label="Password"
                            placeholder="Password"
                            helperText={""}
                            isError={state.passwordError}
                            handleChange={event =>
                                setstate({
                                    ...state,
                                    password: event.target.value
                                })
                            }
                        />
                        <Select
                            list={null}
                            handleChange={event =>
                                setstate({
                                    ...state,
                                    role: event.target.value
                                })
                            }
                            value={state.role}
                            title={'Role'}
                            dropDownList={roleList}
                            placeholder={'Select user role'}
                            isError={state.roleError}
                            helperText={""}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={submitForm} color="primary" disabled={is_submit} >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}


export default FormAdd;
