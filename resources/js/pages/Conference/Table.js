import React, { useEffect, useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import { Api as APILINK } from "../../utils/consts";
import Api from "../../utils/api";
import CopyComponent from './CopyComponent';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import GetAppIcon from '@material-ui/icons/GetApp';
import Tooltip from '@material-ui/core/Tooltip';
import AttendanceList from './AttendanceList';
import AttendanceLogModal from './AttendanceLogModal';

function TableData({ refresh }) {
    const searchRef = useRef('');
    const tableRef = React.createRef();

    const [open, setOpen] = React.useState(false);
    const[attenadance,setAttendance] = useState([])

    useEffect(() => {
        if (refresh) {
            tableRef.current && tableRef.current.onQueryChange();
        }
    }, [refresh]);

    const setSearch = value => {
        console.log(value);
        zipRef.current = "value";
    };

    const searchChange = (value) =>{
        searchRef.current = value.target.value
        tableRef.current && tableRef.current.onQueryChange();
    }


    const view_attendance = (value) => {
        Api.fetchAttendance({id: value?.id})
        .then(result => {
           setAttendance(result.data)
           setOpen(true)
        })
    }

    const export_attendance = (value) =>{
        window.open('/api/export-attendance?id='+btoa(value.id));
    }



    return (
        <React.Fragment>
            <Paper elevation={1} >
                <Box style={{ padding: 20 }}>
                    <TextField
                        id="outlined-basic"
                        label="Search"
                        variant="outlined"
                        onChange={searchChange}
                        style={{ width: 300 }}
                    />
                </Box>
                <MaterialTable
                    tableRef={tableRef}
                    //title="List of Students"
                    components={{
                        Container: props => <Paper {...props} elevation={0}/>
                   }}

                    options={{
                        paging: true,
                        search: false,
                        showTitle: false,
                        sorting: false,
                        pageSize: 10, // make initial page size
                        emptyRowsWhenPaging: false, // To avoid of having empty rows
                        pageSizeOptions: [10, 20, 50, 100], // rows selection options
                        debounceInterval: 500
                    }}
                    columns={[
                        { title: "Conference ID", field: "conf_id", width: "10%" },
                        { title: "Conference Name", field: "conference_name" ,width: "80%"},
                        {
                            field: "conference_link",
                            title: 'Actions',
                            cellStyle: {
                                width: 300
                              },
                            render: rowData => 
                            <div>
                                <CopyComponent data={rowData} />
                                <Tooltip title="View Attendace" aria-label="add">
                                    <Button color="primary" onClick={() => view_attendance(rowData)} ><PeopleOutlineIcon /></Button>
                                </Tooltip>
                                <AttendanceLogModal />
                                <Tooltip title="Export  Data" aria-label="add">
                                    <Button color="primary" onClick={() => export_attendance(rowData)} ><GetAppIcon /></Button>
                                </Tooltip>
                            </div>
                            ,
                         
                        }
                    ]}
                    onSearchChange={setSearch}
                    data={query =>
                        new Promise((resolve, reject) => {
                            let url = `${APILINK}conference-list?`;
                            url += "per_page=" + query.pageSize;
                            url += "&page=" + (query.page + 1);
                            url += "&search=" + searchRef.current;
                            fetch(url)
                                .then(response => response.json())
                                .then(result => { 
                                    let new_data = []
                                   let  list_returns = result.data
                                    for (let index = 0; index < list_returns.length; index++) {
                                       new_data.push({
                                          id: list_returns[index].id,
                                           conf_id: 'CONF-'+list_returns[index].id,
                                           conference_name: list_returns[index].conference_name,
                                       })
                                        
                                    }
                                    resolve({
                                        data: new_data,
                                        page: result.page - 1,
                                        totalCount: result.total
                                    });
                                });
                        })
                    }
                />
            </Paper>
            <AttendanceList open={open} attenadance={attenadance} handleClose={()=> setOpen(false)}  />
        </React.Fragment>
    );
}

export default TableData;
