import React, { useState } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ user }) {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post("/signin", newUser)
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          const newUser = res.data.user;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(newUser));

          setIsLoggedIn(true);
          setNewUser(newUser);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  value={newUser.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  variant="outlined"
                  required
                  fullWidth
                  value={newUser.password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              onClick={handleClick}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup">Dont have a account? Register here.</Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

export default Login;
