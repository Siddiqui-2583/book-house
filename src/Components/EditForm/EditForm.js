import React, { useState, useEffect } from "react";
import { makeStyles,Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
  link: {
    cursor: "pointer",
  },
}));
const apiUrl = "https://localhost:44345/api/books";

const Form = ({ clickedBook,data,setData }) => {
  const history = useHistory();
  console.log(clickedBook);
  const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = async (editedBook) => {
    history.push("/");
    const id =clickedBook.id
    // let newData = data.filter((data) => data.id !== id);
    // newData = { editedBook, ...newData };
    // setData(newData);

    axios
      .patch(apiUrl + "/" + id, editedBook)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.root}>
        <Controller
          name="title"
          control={control}
          defaultValue={clickedBook.title}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Title"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{ required: "Title required" }}
        />

        <Controller
          name="writer"
          control={control}
          defaultValue={clickedBook.writer}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Writer"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{ required: "Writer required" }}
        />
        <Controller
          name="category"
          control={control}
          defaultValue={clickedBook.category}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Category"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{ required: "Category required" }}
        />

        <Controller
          name="publication"
          control={control}
          defaultValue={clickedBook.publication}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              label="Publication"
              variant="outlined"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
              type="text"
            />
          )}
          rules={{ required: "Publication required" }}
        />
        <div>
          {/* <Link to="/"> */}
            <Button type="submit" variant="contained" color="#000">
              Submit
            </Button>
          {/* </Link> */}
        </div>
      </Paper>
    </form>
  );
};

export default Form;
