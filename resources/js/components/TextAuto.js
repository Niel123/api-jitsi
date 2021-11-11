import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {
    makeid,
} from '../utils/helper';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    nameText: {
        fontSize: 20
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    FormHelperText: {
        color: '#f44336',
    }
}));

export default function ControllableStates(props) {
    const classes = useStyles();

    let id = props.id;

    const items = props.items;
    //items[0]
    const [value, setValue] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

    const onInputChangeData = (event, values) => {
       
        setInputValue(values);
        props.handleChange(values);
       // setValue(values);
    }

    const onTagsChange = (event, values) => {

        if (values) {
            //setValue("");
            setInputValue(values[props.dataKey]);
            props.handleChange(values[id]);
            
        } else {
            setInputValue("");
            props.handleChange("");
            //setValue();
            

        }
    }

    var propsEdit = {};

    React.useEffect(() => {  
        if (props.isUpdate) {  
            let elementsIndex = items.findIndex(element => element[props.id] == props.value);  
            if (elementsIndex >= 0) {
                setInputValue(items[elementsIndex][props.dataKey]);
                setValue(items[elementsIndex]);
                propsEdit = {
                    value: value
                };
                
            }
        } else {
            // setValue();
            // setInputValue("");
        }

    }, [props]);

    

    var defaultProps = {};

    if(props.isError){
        defaultProps = {
            error: true,
            helperText: props.isError
        };
    }
   
    return (
        <div className={classes.root}>
            {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
            <div>{`inputValue: '${inputValue}'`}</div>
            <br /> */}
            <FormControl variant="outlined" className={classes.formControl}  >
                <Autocomplete
                    
                    onInputChange={onInputChangeData}
                    onChange={onTagsChange}
                    inputValue={inputValue}
                    id={makeid(7)}
                    options={items}
                    getOptionLabel={(option) => option[props.dataKey]}
                    noOptionsText={props.noOptionsText}
                    renderInput={(params) => 
                          <TextField {...params}  variant="outlined" {...defaultProps} label={props.label} placeholder={props.placeholder}  />
                    }
                /> 
            </FormControl >
        </div>
    );
}
