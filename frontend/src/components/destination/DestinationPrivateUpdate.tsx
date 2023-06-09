import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DestinationForm } from "./DestinationForm";
import { Destination } from "../../models/Destination";
import { ToastContainer, toast } from "react-toastify";
import { getSpecificDestination, updatePrivateDestination } from "../../services/destination";

export const DestinationPrivateUpdate = () => {
	const navigate = useNavigate();
    const {id}  = useParams();
	const [destination, setDestination] = useState<Destination>(new Destination());

    useEffect(() => {
        getSpecificDestination(id)
            .then((response)=>{
                setDestination(response.data);
            });
    }, []);

	const apiCallMehthod = () => {
		updatePrivateDestination(destination)
			.then(() => {
				toast.success("The destination was successfully updated!"); 
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
		<><ToastContainer /> <DestinationForm
			apiCallMethod={apiCallMehthod}
			destination={destination}
			setDestination={setDestination}
			btnMsg="Update destination" /></>
	)
};
