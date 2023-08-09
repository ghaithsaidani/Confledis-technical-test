import {GET_PRODUITS} from "../graphql/Produits.tsx";
import {useQuery} from "@apollo/client"
import {useEffect} from "react";

export const Main2 = () => {

	const {data,loading}=useQuery(GET_PRODUITS)
	if (!loading)
		console.log(data.produits)



	return (
		<></>
	)
}