import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { toast } from "react-toastify";
import { addPrivateDestination } from "../../services/destination";
import useAuth from "../../hooks/useAuth";

export const DestinationPrivateAdd = () => {
	const navigate = useNavigate();
	const [destination, setDestination] = useState<Destination>(new Destination());
    const {auth} = useAuth();

	const apiCallMehthod = () => {
		addPrivateDestination({...destination, belonging_user: auth.usernameOrEmail})
			.then(() => {
				navigate("/");
			})
			.catch((error) =>{
				toast.error("Something went wrong. Please try again later.");
				console.log(error);
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
