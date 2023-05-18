import { useState } from "react";
import { addDestination } from "../../services/destination";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { toast } from "react-toastify";

export const DestinationAddPublic = () => {
	const navigate = useNavigate();
	const [destination, setDestination] = useState<Destination>(new Destination());

	const apiCallMehthod = () => {
		addDestination(destination)
			.then(() => {
				navigate("/");
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
