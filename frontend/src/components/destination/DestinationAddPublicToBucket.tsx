import { Button, Card, CardActions, Container, IconButton } from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { addPublicDestinationToBucket } from "../../services/destination";
import useAuth from "../../hooks/useAuth";
import {ToastContainer, toast } from "react-toastify";

export const DestinationAddPublicToBucket = () => {
    const {id} = useParams();
    const {auth} = useAuth();
    const navigate = useNavigate();

    const userName = auth.usernameOrEmail;

    const handleAdd = () => {
        addPublicDestinationToBucket(id, userName)
        .then(() => {
            toast.success("Destination added successfully");
            setTimeout(() => {
                navigate("/user/my-bucket-list");
            }, 1000);

        });
    }

    return ( 
        <><ToastContainer /><Container>
            <Card>
                <IconButton component={Link} to={`/public-list`}>
                    <ArrowBackIcon />
                </IconButton>
                Are you sure you want to add the selected destination to your bucket list?
                <CardActions>
                    <Button onClick={handleAdd}>Add it</Button>
                    <Button onClick={() => navigate("/user/my-bucket-list")}>Cancel</Button>
                </CardActions>
            </Card>
        </Container></>
    )
}