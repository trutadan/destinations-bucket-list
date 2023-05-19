import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { toast } from "react-toastify";
import { addPrivateDestination, getSpecificDestination, updatePrivateDestination } from "../../services/destination";
import useAuth from "../../hooks/useAuth";

export const DestinationPrivateUpdate = () => {
	const navigate = useNavigate();
    const {id}  = useParams();
	const [destination, setDestination] = useState<Destination>(new Destination());
    const {auth} = useAuth();

    useEffect(() => {
        getSpecificDestination(id)
            .then((response)=>{
                setDestination(response.data);
            });
    }, []);

	const apiCallMehthod = () => {
		updatePrivateDestination(destination)
			.then(() => {
				navigate("/user/my-bucket-list");
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
			btnMsg="Update destination"
		/>
	)
};
