import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        // padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 300,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
        cursor: 'default!important'
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function Search(props) {
    const classes = useStyles();

    const [search, setSearch] = React.useState('');

    const searchDataChange = (e) => {
        setSearch(e.target.value);
        props.searchData(e.target.value);
    }

    const searchNow = () => {
        props.searchData(search);
    }


    return (
        <Paper component="form" className={classes.root}>
            {/* <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton> */}
            <InputBase
                className={classes.input}
                placeholder={props.title}
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={searchDataChange}
                value={search}
            />
            <IconButton onClick={searchNow} type="button" className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
            {/* <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                <DirectionsIcon />
            </IconButton> */}
        </Paper>
    );
}