import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

export default function TextInput(props) {
    const [state, setState] = React.useState({
        propValue: props.value,
    });

    console.log(state.propValue)
    
    let custom_attr = {}
    if(props.isError){
      custom_attr = {...custom_attr,  error: true,  helperText: props.isError};
    }

    const optionList = props.dropDownList.map((data, key) => 
        <option key={key} value={data.value}>{ data.name }</option>
    );

    return (
        <React.Fragment>
            <InputLabel htmlFor="filled-age-native-simple">{ props.title }</InputLabel>
            <Select
                native
                // value={state.propValue}
                onChange={props.handleChange}
                inputProps={{
                    name: 'age',
                    id: 'filled-age-native-simple',
                }}
                variant="outlined"
                {...custom_attr}
                fullWidth
            >
                <option aria-label="None" value="">{ props.placeholder }</option>
                { optionList }
            </Select>
        </React.Fragment>
    );
}

