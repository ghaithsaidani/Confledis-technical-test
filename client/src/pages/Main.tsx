import data from "../data.json"
import Card from "../models/Card.tsx";
import {MyCard} from "../components/product-card/MyCard.tsx";
import {FaSearch} from "react-icons/fa";
export const Main = () => {
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
					data.cards.map((card:Card)=>(
						<MyCard key={card.id} {...card}/>
					))
				}
			</div>
		</main>
	)
}