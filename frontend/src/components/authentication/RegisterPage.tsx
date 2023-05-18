import { useState } from "react";
import { Button, TextField, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  checkEmailExists,
  checkUsernameExists,
  register,
} from "../../services/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
      ) {
        throw new Error("Invalid email address format.");
      }

      const emailExists = await checkEmailExists(formData.email);
      if (emailExists.data.exists) {
        throw new Error("Email already exists.");
      }

      if (!/^[a-zA-Z0-9]*$/.test(formData.username)) {
        throw new Error("Username can only contain letters and numbers.");
      }

      if (formData.username.length < 4) {
        throw new Error("Username must be at least 4 characters long.");
      }

      const usernameExists = await checkUsernameExists(formData.username);
      if (usernameExists.data.exists) {
        throw new Error("Username already exists.");
      }

      if (
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'\?\/>.<,])(?!.*\s).{8,}/.test(
          formData.password
        )
      ) {
        throw new Error(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        );
      }

      if (formData.password !== formData.confirm_password) {
        throw new Error("Passwords do not match.");
      }

      const response = await register(formData);
      if (response.status < 200 || response.status >= 300) {
        throw new Error(
          "An error occurred while submitting the register form."
        );
      } else {
        toast.success("Your account has been successfully registered!");

        navigate("/");
      }
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };

  return (
    <>
      <ToastContainer />
      <Grid
        container
        component="main"
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: "#fff" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <img src={logo} alt="Logo" height="40" />
              </Link>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
            </div>
            <form
              onSubmit={handleSubmit}
              style={{ width: "100%", marginTop: "20px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    name="first_name"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    autoComplete="new-password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
              >
                Register
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};
