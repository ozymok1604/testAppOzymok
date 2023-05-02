import { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Loader } from "../loader";
import { makeStyles, TablePagination } from "@material-ui/core";
import { UsersContext } from "../../context";
import Pagination from "@mui/material/Pagination";

const useStyles = makeStyles({
  root: {
    paddingRight: "10%",
    paddingLeft: " 10%",
    paddingBottom: "10%",
    paddingTop: "10px",
  },
});

const UsersTable = () => {
  const { handlePageChange, users, genderFilter, isLoading, handleUserClick } =
    useContext(UsersContext);

  const classes = useStyles();

  const columns = [
    {
      name: "name",
      label: "Name",
      align: "left",
    },
    {
      name: "email",
      label: "Email",
      align: "right",
    },
    {
      name: "gender",
      label: "Gender",
      align: "right",
    },
    {
      name: "status",
      label: "Status",
      align: "right",
    },
  ];
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell align={column.align}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {!isLoading && users?.length ? (
            <TableBody>
              {users
                ?.filter((row) =>
                  genderFilter == "male/female"
                    ? row?.gender == "male" || row?.gender == "female"
                    : row?.gender == genderFilter
                )
                ?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => handleUserClick(row)}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.gender}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <Loader />
          )}
        </Table>
      </TableContainer>
      <Pagination onChange={handlePageChange} count={10} color="primary" />
    </div>
  );
};

export { UsersTable };
