import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/Delete";
import { Destination } from "../../models/Destination";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPublicDestinations } from "../../services/destination";


export const DestinationPublicGetAll = () => {
    const { auth } = useAuth();

    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect( () => {
        getPublicDestinations()
            .then((response) => {
                setDestinations(response.data);
            })}, []);
        

    return (
        <Container sx={{width: "100%"}}>
            {auth.role === "ADMIN" && (
                <Button variant="outlined" sx={{background: "black", color: "white"}} component={Link} to={`/admin/add-public`}>
                                + Add new destination
                </Button>
            )}
            <TableContainer sx={{width: "100%"}}>
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
                                <TableCell>{destination.image_url}</TableCell>
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
                                    to={`/public-list/add-to-private/${destination.id}`}>
                                    <Tooltip title="Delete" arrow>
                                        <DeleteForeverIcon
                                            sx={{
                                            color: "red"
                                        }}/>
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