import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Button } from "@mui/material";
import { Destination } from "../../models/Destination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPrivateDestinations } from "../../services/destination";
import EditIcon from '@mui/icons-material/Edit';

export const DestinationPrivateGetAll = () => {

    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect( () => {
        getPrivateDestinations()
            .then((response) => {
                setDestinations(response.data);
            })}, []);
        

    return (
        <Container maxWidth="xl" sx={{paddingTop: "80px"}}>
            <Button variant="outlined" sx={{background: "black", color: "white"}} component={Link} to={`/user/add-private`}>
                            + Add new destination
            </Button>
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
                                <TableCell><a href={`${destination.image_url}`}>Link</a></TableCell>
                                <TableCell>{destination.arrive_date}</TableCell>
                                <TableCell>{destination.depart_date}</TableCell>
                                <TableCell>{destination.description}</TableCell>
                                <TableCell>
                                    <IconButton
                                        component={Link}
                                        sx={{
                                        mr: 3
                                    }}
                                        to={`/user/update-private/${destination.id}`}
                                    >
                                    <Tooltip title="Update" arrow>
                                        <EditIcon
                                            sx={{
                                            color: "black"
                                        }}
                                        />
                                    </Tooltip>
                                    </IconButton></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}