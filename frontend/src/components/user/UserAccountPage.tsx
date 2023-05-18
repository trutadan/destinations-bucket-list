import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import { UserProfile } from "../../models/User";
import { getAccount } from "../../services/authentication";

const styles = {
  root: {
    minWidth: 275,
    margin: "auto",
    maxWidth: 500,
  },
};

export const UserAccountPage = () => {
  const [userInformation, setUserInformation] = useState<UserProfile>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAccount();
        setUserInformation(response.data);
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <ToastContainer />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Link to="/" style={{ marginRight: "auto" }}>
            <img src={logo} alt="Logo" height="60" />
          </Link>
        </Box>

        <Typography component="h1" variant="h3" style={{ marginTop: "20px" }}>
          My Profile
        </Typography>
      </div>

      <Card style={{ ...styles.root, padding: "24px", fontSize: "18px" }}>
        <CardContent>
          {userInformation && (
            <>
              <Typography
                variant="h5"
                color="textPrimary"
                style={{ marginBottom: "8px" }}
              >
                Name
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {userInformation.first_name} {userInformation.last_name}
              </Typography>

              <Divider style={{ margin: "15px 0", backgroundColor: "black" }} />

              <Typography
                variant="h5"
                color="textPrimary"
                style={{ marginBottom: "8px" }}
              >
                Email
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {userInformation.email}
              </Typography>

              <Divider style={{ margin: "15px 0", backgroundColor: "black" }} />

              <Typography
                variant="h5"
                color="textPrimary"
                style={{ marginBottom: "8px" }}
              >
                Username
              </Typography>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {userInformation.username}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          component={Link}
          to="/account/edit"
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <Button
          component={Link}
          to="/account/cancel"
          variant="contained"
          color="secondary"
        >
          Cancel Account
        </Button>
      </div>
    </>
  );
};
