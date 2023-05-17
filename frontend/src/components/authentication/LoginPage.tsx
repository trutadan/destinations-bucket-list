import { useState } from "react";
import { BACKEND_API_URL } from "../../constants";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import { PersonAdd } from "@mui/icons-material";

export const LoginPage = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameOrEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameOrEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(
        `${BACKEND_API_URL}/login/`,
        {
          user: usernameOrEmail,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;
        setAuth({ usernameOrEmail, password, role, accessToken });

        if (response.data.role !== "REGULAR") navigate("/navigation");
        else navigate(from, { replace: true });
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          console.log(error);
          toast.error("Incorrect username/email or password.");
        } else {
          console.log(error);
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <Grid container justifyContent="center">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 5,
            maxWidth: "300px",
            width: "100%",
          }}
          onSubmit={handleLoginSubmit}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "16px",
              boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
              marginBottom: 5,
            }}
          >
            <Link to="/" style={{ marginRight: "auto" }}>
              <img src={logo} alt="Logo" height="40" />
            </Link>
          </Box>

          <TextField
            style={{ marginBottom: 16 }}
            label="Username/Email"
            variant="outlined"
            fullWidth
            value={usernameOrEmail}
            name="usernameOrEmail"
            onChange={handleUsernameOrEmailChange}
          />
          <TextField
            style={{ marginBottom: 16 }}
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            name="password"
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <Button onClick={handlePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              ),
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log in
          </Button>
          <p style={{ marginBottom: 8 }}>Don't have an account?</p>
          <Link to="/register">
            <Button startIcon={<PersonAdd />} color="primary">
              Register
            </Button>
          </Link>
        </form>
      </Grid>
    </>
  );
};
