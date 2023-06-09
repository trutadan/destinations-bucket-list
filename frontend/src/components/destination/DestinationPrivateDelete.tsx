import { Button, Card, CardActions, Container, IconButton } from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { deletePrivateDestination } from "../../services/destination";
import { ToastContainer, toast } from "react-toastify";

export const DestinationPrivateDelete = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        deletePrivateDestination(id)
        .then(() => {
            toast.success("The destination has been successfully deleted!");
            setTimeout(() => {
                navigate("/user/my-bucket-list");
            }, 1000);
        });
    }

    return ( 
        <><ToastContainer /><Container>
            <Card>
                <IconButton component={Link} to={`/user/my-bucket-list`}>
                    <ArrowBackIcon />
                </IconButton>
                Are you sure you want to remove the selected destination?
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={() => navigate("/user/my-bucket-list")}>Cancel</Button>
                </CardActions>
            </Card>
        </Container></>
    )
}