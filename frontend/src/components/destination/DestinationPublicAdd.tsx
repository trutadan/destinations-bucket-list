import { useState } from "react";
import { addPublicDestination } from "../../services/destination";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { ToastContainer, toast } from "react-toastify";

export const DestinationAddPublic = () => {
	const navigate = useNavigate();
	const [destination, setDestination] = useState<Destination>(new Destination());

	const apiCallMehthod = () => {
		addPublicDestination(destination)
			.then(() => {
				toast.success("The destination has been successfully added!");
				setTimeout(() => {
					navigate("/public-list");
				}, 1000);
			})
			.catch(() =>{
				toast.error("Something went wrong. Please try again later.");
			});
	}

	return(
		<><ToastContainer /> <DestinationForm
			apiCallMethod={apiCallMehthod}
			destination={destination}
			setDestination={setDestination}
			btnMsg="Add destination" /></>
	)
};
