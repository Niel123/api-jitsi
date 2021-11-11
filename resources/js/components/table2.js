import React, { useRef } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
/*table*/
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import {
  makeid,
} from '../utils/helper';

/*other*/

let tableId = makeid(7);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f4883d;",
    color: "#f7f7f7",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tableWrapper: {
    // maxHeight: 440,
    overflow: "auto",

  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function TableComponent(props) {
  let dataList = props.list;
  /*table*/
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useStyles();
  const tableRef = useRef(null);
  let myRef = useRef();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // var elmnt = document.getElementById("content");
    //myRef.scrollIntoView();
    // var elmnt = document.getElementById(tableId);
    // elmnt.scrollIntoView();
  };

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var divStyle = {
    minHeight: "420px",
  };

  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper} ref={tableRef}  >
          <Table

            stickyHeader
            aria-label="sticky table"
            className={classes.table}
            id={tableId}
          >
            <TableHead>
              <TableRow>
                {props.columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                          >
                            {column.format &&
                              typeof value ===
                              "number"
                              ? column.format(
                                value
                              )
                              :
                              column.id === 'image' ?
                                <img src={value} style={{ width: 50, height: 50 }} />
                                : value

                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {props.rows.length < 1 ? <div className="no-data">No data found!</div> : ''}
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, { label: 'All', value: -1 }]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "previous page",
          }}
          nextIconButtonProps={{
            "aria-label": "next page",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
