import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './BookTable.css';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { Link } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id,title, writer, category, publication) {
  return { id,title, writer, category, publication };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function BookTable({ setClickedBook,data,setData }) {
  const classes = useStyles();
  
  const apiUrl = "https://localhost:44345/api/books";
  const rows = [];

  data.forEach((book) => {
    rows.push(
      createData(
        book.id,
        book.title,
        book.writer,
        book.category,
        book.publication
      )
    );
  });
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        // console.log(response);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  function handleDelete(id) {
    console.log(id);
    const newData = data.filter(data => data.id !== id)
    setData(newData);
    axios
      .delete(apiUrl + "/" + id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="tableContainter">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="right">Writer</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Publication</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.title}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.writer}</StyledTableCell>
                <StyledTableCell align="right">{row.category}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.publication}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to="/edit-book">
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        setClickedBook(row);
                      }}
                      className={classes.margin}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {
                      handleDelete(row.id);
                    }}
                    className={classes.margin}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
