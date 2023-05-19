import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Destination } from "../../models/Destination";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addPrivateDestination, addPublicDestinationToBucket, getPublicDestinations } from "../../services/destination";
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from "react-toastify";

export const DestinationPublicGetAll = () => {
    const { auth } = useAuth();

    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect( () => {
        getPublicDestinations()
            .then((response) => {
                setDestinations(response.data);
                console.log(response.data);
            })},
        []);
    

    return (
        <Container maxWidth="xl" sx={{paddingBottom:"80px"}}>
            {auth.role === "ADMIN" && (
                <Button variant="outlined" sx={{background: "black", color: "white"}} component={Link} to={`/admin/add-public`}>
                                + Add new destination
                </Button>
            )}
            <ToastContainer/>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Latitude</TableCell>
                            <TableCell>Longitude</TableCell>
                            <TableCell>Image URL</TableCell>
                            <TableCell>Arrive Date</TableCell>
                            <TableCell>Departure Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Operations</TableCell>
                        </TableRow>
                    </TableHead>  
                    <TableBody>
                        {destinations.map((destination: Destination, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{destination.title}</TableCell>
                                <TableCell>{destination.latitude}</TableCell>
                                <TableCell>{destination.longitude}</TableCell>
                                <TableCell><a href={`${destination.image_url}`}>Link</a></TableCell>
                                <TableCell>{destination.arrive_date}</TableCell>
                                <TableCell>{destination.depart_date}</TableCell>
                                <TableCell>{destination.description}</TableCell>
                                <TableCell>
                                {auth.role === "REGULAR" && (
                                    <IconButton
                                        component={Link}
                                        sx={{
                                        mr: 3
                                    }}
                                        to={`/user/add-public/${destination.id}`}
                                    >
                                    <Tooltip title="Add to bucket list" arrow>
                                        <AddIcon
                                            sx={{
                                            color: "black"
                                        }}
                                        />
                                    </Tooltip>
                                    </IconButton>
                                )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}