import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "../../components/TextInput";
import Snackbar from "../../components/Snackbar";
import Api from "../../utils/api";
import { setCookie, getCookie } from "../../utils/helper";
import bgImage from "../../assets/images/chris-montgomery-smgTvepind4-unsplash.jpg";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignInSide() {
    const classes = useStyles();

    const [state, setstate] = React.useState({
        email: "",
        password: "",
    });
    const [error, setError] = React.useState("");

    function handleSubmit(event) {
        event.preventDefault();
        let params = {
            email: state.email,
            password: state.password,
        };

        Api.login(params)
            .then((result) => { 
                setCookie(["access_token", result.data.access_token]);
                setCookie(["userLogin", JSON.stringify(result.data.user)]);
                window.location.href = "/dashboard";
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    setError(error.response.data.message);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    setError(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setError(error.message);
                }
            });
    }

    useEffect(() => {
        if (getCookie("userLogin")) {
            window.location.href = "/";
        }
    });

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} lg={9} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                lg={3}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        {error ? <Snackbar message={error} /> : null}
                        <TextInput
                            name="username"
                            value={state.email}
                            type={"text"}
                            label="Email"
                            placeholder="Email"
                            helperText={""}
                            isError={state.usernameError}
                            handleChange={(event) =>
                                setstate({
                                    ...state,
                                    email: event.target.value,
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
                            isError={state.usernameError}
                            handleChange={(event) =>
                                setstate({
                                    ...state,
                                    password: event.target.value,
                                })
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
