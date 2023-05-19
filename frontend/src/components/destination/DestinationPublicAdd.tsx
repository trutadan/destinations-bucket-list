import { useState } from "react";
import { addPublicDestination } from "../../services/destination";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { toast } from "react-toastify";

export const DestinationAddPublic = () => {
	const navigate = useNavigate();
	const [destination, setDestination] = useState<Destination>(new Destination());

	const apiCallMehthod = () => {
		addPublicDestination(destination)
			.then(() => {
				navigate("/public-list");
			})
			.catch((error) =>{
				toast.error("Something went wrong. Please try again later.");
			});
	}

	return(
		<DestinationForm
			apiCallMethod={apiCallMehthod}
			destination={destination}
			setDestination={setDestination}
			btnMsg="Add destination"
		/>
	)
};
