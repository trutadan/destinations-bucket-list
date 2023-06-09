import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { ToastContainer, toast } from "react-toastify";
import { addPrivateDestination } from "../../services/destination";
import useAuth from "../../hooks/useAuth";

export const DestinationPrivateAdd = () => {
	const navigate = useNavigate();
	const [destination, setDestination] = useState<Destination>(new Destination());
    const {auth} = useAuth();

	const apiCallMehthod = () => {
		addPrivateDestination({...destination, belonging_user: auth.usernameOrEmail})
			.then(() => {
				toast.success("The destination has been successfully created!");
				setTimeout(() => {
					navigate("/user/my-bucket-list");
				}, 1000);
			})
			.catch((error) =>{
				Object.entries(error.response.data).forEach(([key, value] : [string, any]) => { 
					toast.error(key + " : " + value);
				});
			});
	}

	return(
		<> <ToastContainer />
		<DestinationForm
			apiCallMethod={apiCallMehthod}
			destination={destination}
			setDestination={setDestination}
			btnMsg="Add destination"
		/>
		</>
		
	)
};
