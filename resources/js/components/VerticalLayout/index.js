import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { withStyles } from "@material-ui/core/styles";
import { mainListItems, secondaryListItems } from "./listItems";
import { eraseCookie } from "../../utils/helper";


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

const drawerWidth = 300;

const classes = (theme) => ({
    root: {
        display: "flex",
        //backgroundColor: 'blue',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        // backgroundColor:'#29baac',
        // boxShadow:'0px 6px 7px -4px rgba(0,0,0,0.2), 0px 11px 15px 1px rgba(0,0,0,0.14), 0px 4px 20px 3px rgba(0,0,0,0.12);',
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        //backgroundColor: '#fff',
        //boxShadow: '0 0.46875rem 2.1875rem rgba(59,62,102,.03), 0 0.9375rem 1.40625rem rgba(59,62,102,.03), 0 0.25rem 0.53125rem rgba(59,62,102,.05), 0 0.125rem 0.1875rem rgba(59,62,102,.03)',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        //boxShadow: '0 0.46875rem 2.1875rem rgba(59,62,102,.03), 0 0.9375rem 1.40625rem rgba(59,62,102,.03), 0 0.25rem 0.53125rem rgba(59,62,102,.05), 0 0.125rem 0.1875rem rgba(59,62,102,.03)',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        // backgroundColor: 'red',
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
});

class VerticalLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
        };
    }

    LogOut(){
        document.cookie = "userLogin=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
        window.location.href = "/login";
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="absolute"
                        elevation={5}
                        className={clsx(
                            classes.appBar,
                            open && classes.appBarShift
                        )}
                    >
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() =>
                                    this.setState({ open: !this.state.open })
                                }
                                className={clsx(
                                    classes.menuButton,
                                    open && classes.menuButtonHidden
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                VCON
                            </Typography>
                            <IconButton color="inherit" onClick={() => this.LogOut()} >
                                <ExitToAppIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    {/* borderRight: 'none' */}
                    <Drawer
                        PaperProps={{ elevation: 0 }}
                        variant="permanent"
                        classes={{
                            paper: `${clsx(
                                classes.drawerPaper,
                                !open && classes.drawerPaperClose
                            )}`,
                        }}
                        open={open}
                    >
                        <div className={classes.toolbarIcon}>
                            <IconButton
                                onClick={() =>
                                    this.setState({ open: !this.state.open })
                                }
                            >
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>{mainListItems}</List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        {/* <Container maxWidth="lg" className={classes.container}>
              {this.props.children}
            </Container> */}
                        {this.props.children}
                        <Copyright />
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = (state) => {
    return {
        ...state.Layout,
    };
};

export default connect(mapStatetoProps)(withStyles(classes)(VerticalLayout));
