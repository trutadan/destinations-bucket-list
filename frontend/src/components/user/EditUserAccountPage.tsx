import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getAccount, updateAccount } from "../../services/authentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

export const EditUserAccountPage: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAccount();
  }, []);

  const fetchUserAccount = async () => {
    try {
      const response = await getAccount();
      const { first_name, last_name, username, email } = response.data;
      setFormData({ first_name, last_name, username });
      setEmail(email);
    } catch (error) {
      toast.error("Failed to fetch data about you!");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await updateAccount(formData);
      navigate("/account");
      toast.success("Account updated successfully!");
    } catch (error) {
      toast.error("Username already in use!");
    }
  };

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
            marginBottom: "20px",
          }}
        >
          <Link to="/" style={{ marginRight: "auto" }}>
            <img src={logo} alt="Logo" height="60" />
          </Link>
        </Box>
      </div>
      <TextField
        label="Email"
        name="email"
        value={email}
        sx={{ mb: 5 }}
        disabled
      />
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          <TextField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
