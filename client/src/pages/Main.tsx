import Card from "../models/Card.tsx";
import {MyCard} from "../components/product-card/MyCard.tsx";
import {FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import {getAll} from "../services/produit.service.tsx";
export const Main = () => {
	const [produits, setProduits] = useState([]);

	useEffect(() => {
			getAll().then((res) => {
				//console.log(res.data)
				setProduits(res.data.produits);
			}).catch((error) => {
				console.log(error);
			});
		}, [produits]
	);
	return (
		<main>
			<div className="search">
				<input type="text" placeholder="Rechercher un produit"/>
					<button>
						<FaSearch/>
					</button>
			</div>
			<div className={"cards"}>
				{
					produits.map((card:Card)=>(
						<MyCard key={card._id}  {...card} img={`uploads/${card.img}`}/>
					))
				}
			</div>
		</main>
	)
}