import { Button, Card, CardActions, Container, IconButton } from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";
import { deletePrivateDestination } from "../../services/destination";

export const DestinationPrivateDelete = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {
        deletePrivateDestination(id);
        navigate("/user/my-bucket-list");
    }

    return ( 
        <Container>
            <Card>
                <IconButton component={Link} to={`/user/my-bucket-list`}>
                    <ArrowBackIcon/>
                </IconButton>
                Are you sure you want to remove the selected destination?
            <CardActions>
               <Button onClick={handleDelete}>Delete it</Button>
               <Button onClick={() => navigate("/user/my-bucket-list")}>Cancel</Button>
            </CardActions>
            </Card>
        </Container>
    )
}