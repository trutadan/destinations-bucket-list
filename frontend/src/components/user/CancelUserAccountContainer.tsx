import {
  Container,
  Card,
  CardContent,
  IconButton,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { cancelUserAccount } from "../../services/authentication";
import useAuth from "../../hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";

export const CancelUserAccountContainer = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleCancelAccount = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      cancelUserAccount();
    } catch (error) {
      toast.error("Failed to cancel account!");
    }
    setAuth({});
    navigate("/");
  };

  const handleReturn = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    navigate("/account");
  };

  return (
    <>
      <ToastContainer />

      <Container>
        <Card>
          <CardContent>
            <IconButton component={Link} sx={{ mr: 3 }} to={`/account`}>
              <ArrowBackIcon />
            </IconButton>{" "}
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              Are you sure you want to delete your account?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              All your data will be lost!
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleCancelAccount}>Cancel</Button>
            <Button onClick={handleReturn}>Return</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
