import { Button, Card, CardActions, CardContent, IconButton, InputLabel, Select, TextField, MenuItem, Autocomplete} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Destination } from "../../models/Destination";
import { ToastContainer } from "react-toastify";

export const DestinationForm = (
    { apiCallMethod, destination, setDestination, btnMsg} : 
    { apiCallMethod: any, destination: Destination, setDestination : any, btnMsg: any}) =>{
	
    const [errors, setErrors] = useState({
		title: "",
        latitude: "",
        longitude: "",
        image_url: "",
        arrive_date: "",
        depart_date: "",
        description: "",
    })

	const validateForm  = () => {
		let valid=true;
		const newErrors={
			title: "",
            latitude: "",
            longitude: "",
            image_url: "",
            arrive_date: "",
            depart_date: "",
            description: ""
		};

		if(destination.title===""){
			newErrors.title="Title is required!";
			valid = false;
		}

		if(isNaN(Number(destination.latitude))){
			newErrors.latitude="Latitude is required!";
			valid = false;
		}

		if(isNaN(Number(destination.longitude))){
			newErrors.longitude="Latitude is required!";
			valid = false;
		}
		
		if(destination.image_url===""){
			newErrors.image_url="Image URL is required!";
			valid = false;
		}

		if(destination.arrive_date===""){
			newErrors.arrive_date="Arrive date is required!";
			valid = false;
		}

        if(destination.depart_date===""){
			newErrors.arrive_date="Arrive date is required!";
			valid = false;
		}
    
		if(destination.description===""){
			newErrors.description="Description is required!";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        if(validateForm())
		    apiCallMethod();
	}

    return (
		<Container sx={{paddingTop: "80px", paddingBottom: "80px"}}>
			<ToastContainer/>
			<Card>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<TextField
							id="title"
							label="Title"
							variant="outlined"
                            value={destination.title}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, title: event.target.value })}
							error={!!errors.title}
							helperText={errors.title}
						/>
						<TextField
							id="latitude"
							label="Latitude"
							variant="outlined"
                            value={destination.latitude}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, latitude: event.target.value })}
							error={!!errors.latitude}
							helperText={errors.latitude}
						/>
						<TextField
							id="longitude"
							label="Longitude"
							variant="outlined"
                            value={destination.longitude}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, longitude: event.target.value })}
							error={!!errors.longitude}
							helperText={errors.longitude}
						/>
						<TextField
							id="image_url"
							label="Image URL"
							variant="outlined"
                            value={destination.image_url}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, image_url: event.target.value })}
							error={!!errors.image_url}
							helperText={errors.image_url}
						/>
						<InputLabel sx={{ float:"left"}}>
							Arrive Date:
						</InputLabel>
						<TextField
							type="date"
							id="arrive_date"
							variant="outlined"
                            value={destination.arrive_date}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, arrive_date: event.target.value })}
							error={!!errors.arrive_date}
							helperText={errors.arrive_date}
						/>
						<InputLabel sx={{ float:"left"}}>
							Departure Date:
						</InputLabel>
						<TextField
							type="date"
							id="depart_date"
							variant="outlined"
                            value={destination.depart_date}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, depart_date: event.target.value})}
							error={!!errors.depart_date}
							helperText={errors.depart_date}
						/>
						<TextField
							type="text-area"
							id="description"
							label="Description"
							variant="outlined"
                            value={destination.description}
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setDestination({ ...destination, description: event.target.value })}
							error={!!errors.description}
							helperText={errors.description}
						/>
						<Button type="submit" sx={{float: "left", color: "white", background: "black"}}>{btnMsg}</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
}