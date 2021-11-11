import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import Box from "@material-ui/core/Box";
import { Api, ENPOINT } from "../../utils/consts";

function TableData({ refresh }) {
    //const [search, setSearch] = useState("");
    const searchRef = useRef('');

    const tableRef = React.createRef();

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
                        pageSize: 2, // make initial page size
                        emptyRowsWhenPaging: false, // To avoid of having empty rows
                        pageSizeOptions: [2, 20, 50, 100], // rows selection options
                        debounceInterval: 500
                    }}
                    columns={[
                        { title: "ID", field: "id" },
                        { title: "First Name", field: "first_name" },
                        { title: "Last Name", field: "last_name" },
                        { title: "Middle Name", field: "middle_name" }
                    ]}
                    onSearchChange={setSearch}
                    data={query =>
                        new Promise((resolve, reject) => {
                            let url = `${Api}student-list?`;
                            url += "per_page=" + query.pageSize;
                            url += "&page=" + (query.page + 1);
                            url += "&search=" + searchRef.current;
                            fetch(url)
                                .then(response => response.json())
                                .then(result => {
                                    resolve({
                                        data: result.data,
                                        page: result.page - 1,
                                        totalCount: result.total
                                    });
                                });
                        })
                    }
                />
            </Paper>
        </React.Fragment>
    );
}

export default TableData;
