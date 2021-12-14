import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment'
import { Api as APILINK } from "../../utils/consts";

const counting = 15;

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({conf_data}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [studentDetail, setOpenStudentDetail] = React.useState(false);
    const [studentData, setStudentData] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenStudentDetail = (data) => {
        setStudentData(data);
        setOpenStudentDetail(true);
    };

    const handleCloseStudentDetail = () => {
        setStudentData({});
        setOpenStudentDetail(false);
    };

    const ListingStudent = ({data}) => {
        return (
            <>
                <Button variant="outlined" color="primary" onClick={() => handleOpenStudentDetail(data.detail)}>
                    <SearchIcon />
                </Button>
            </>
        )
    }

    return (
        <React.Fragment>
            <Tooltip title="View Log History" aria-label="add">
                <Button color="primary" onClick={handleClickOpen}>
                    <ListAltIcon />
                </Button>
            </Tooltip>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Divider />

                <Paper elevation={1} >
                    <MaterialTable
                        title="Student log list"
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
                        columns={[
                            { title: "#", field: "id", width: "10%" },
                            { title: "Studen Name", field: "student_name", width: "80%" },
                            {
                                field: "student_name",
                                title: 'Options',
                                cellStyle: {
                                    width: 200
                                },
                                render: rowData =>
                                    <>
                                        <ListingStudent data={rowData} />
                                    </>
                                ,

                            }
                        ]}
                        data={() =>
                            new Promise((resolve, reject) => {
                                let url = `${APILINK}user-histories/${conf_data.id}`;
                                fetch(url)
                                    .then(response => response.json())
                                    .then(result => {
                                        let new_data = []
                                        let cnt = 0;

                                        console.log('res', result)

                                        for (let index = 0; index < result.length; index++) {
                                            cnt += 1;
                                            new_data.push({
                                                id: cnt,
                                                student_name: result[index].student_name,
                                                detail: result[index],
                                            });
                                        }
                                        console.log('new_data', new_data)
                                        resolve({
                                            data: new_data,
                                            page: result.page - 1,
                                            totalCount: result.total
                                        });
                                    });
                            })
                        }
                        options={{
                            search: false,
                            paging: false,
                        }}
                    />
                </Paper>

            </Dialog>

            <Dialog onClose={handleCloseStudentDetail} aria-labelledby="simple-dialog-title" open={studentDetail}>
                    <Paper elevation={1} >
                    <MaterialTable
                        title="Student log-in History"
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
                        columns={[
                            { title: "#", field: "id", width: "10%" },
                            { title: "Date and Time Logged In", field: "created_at", width: "90%" },
                        ]}
                        data={() =>
                            new Promise((resolve, reject) => {
                                let url = `${APILINK}user-login-history/${studentData.room_name}/${studentData.student_name}/${studentData.conference_id}`;
                                fetch(url)
                                    .then(response => response.json())
                                    .then(result => {
                                        let new_data = []
                                        let cnt = 0;

                                        console.log('resssss', result)

                                        for (let index = 0; index < result.length; index++) {
                                            cnt += 1;
                                            new_data.push({
                                                id: cnt,
                                                created_at: moment(result[index].created_at).format('MMM DD, hh:mm:ss A')
                                            });
                                        }
                                        resolve({
                                            data: new_data,
                                            page: result.page - 1,
                                            totalCount: result.total
                                        });
                                    });
                            })
                        }
                        options={{
                            search: false,
                            paging: false,
                        }}
                    />
                </Paper>
                </Dialog>
        </React.Fragment>
    );
}
