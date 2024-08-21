import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const onSubmit = () => {
    const userData = { name: name, age: age };
    navigate("/chatroom", { state: userData });
  };
  return (
    <Grid container flexDirection={"column"}>
      <Grid item>
        <Typography variant="h4">چت روم</Typography>
      </Grid>
      <Grid item mt={2}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <label>نام</label>
      </Grid>
      <Grid item mt={2}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        ></TextField>
        <label>سن</label>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disabled={!name || !age}
          onClick={onSubmit}
        >
          ثبت
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
