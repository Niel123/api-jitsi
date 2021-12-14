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
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
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

export default function FullScreenDialog({userData}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [studentDetail, setOpenStudentDetail] = React.useState(false);
    const [studentList, setStudentList] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    console.log('userData', userData)

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenStudentDetail = (data) => {
        setStudentList(data);
        setOpenStudentDetail(true);
    };

    const handleCloseStudentDetail = () => {
        setStudentList([]);
        setOpenStudentDetail(false);
    };

    const ListingStudent = ({data}) => {
        console.log('data', )
        const listing = data.student_list;
        return (
            <>
                <Button variant="outlined" color="primary" onClick={() => handleOpenStudentDetail(listing)}>
                    <PeopleOutlineIcon />
                </Button>
            </>
        )
    }

    return (
        <React.Fragment>
            <Tooltip title="View Details" aria-label="add">
                <Button color="primary" onClick={handleClickOpen}>
                    <SearchIcon />
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
                        title="Student list that are active on the conference per duration"
                        components={{
                            Container: props => <Paper {...props} elevation={0} />
                        }}
                        columns={[
                            { title: "#", field: "id", width: "10%" },
                            { title: "Timer Duration", field: "time_duration", width: "10%" },
                            { title: "Student count", field: "student_count", width: "10%" },
                            {
                                field: "student_list",
                                title: 'Student List',
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
                        data={query =>
                            new Promise((resolve, reject) => {
                                let url = `${APILINK}student-log/${userData.id}`;
                                fetch(url)
                                    .then(response => response.json())
                                    .then(result => {
                                        let new_data = []

                                        console.log('res', result);
                                        let cnt = 0;

                                        for (let index = 0; index < result.length; index++) {
                                            const students = JSON.parse(result[index].students_json);
                                            cnt += counting;
                                            new_data.push({
                                                id: result[index].id,
                                                student_count: students.length,
                                                student_list: students,
                                                time_duration: `@ ${cnt} minute(s)` 
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

            <Dialog onClose={handleCloseStudentDetail} aria-labelledby="simple-dialog-title" open={studentDetail}>
                    <DialogTitle id="simple-dialog-title">Student List</DialogTitle>
                    <List>
                        {studentList.map((name) => (
                            <ListItem key={name}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={name} />
                            </ListItem>
                        ))}
                    </List>
                </Dialog>
        </React.Fragment>
    );
}
