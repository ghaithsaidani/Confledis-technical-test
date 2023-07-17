import Card from "../../models/Card.tsx";
import '../../styles/card.modules.scss'

export const MyCard = (props:Card) => {
	return (
		<div className={"my-card"}>
			<img src={props.img.src} alt={props.img.alt}/>
			<h3 className={"card-name"}>{props.nom}</h3>
			<div className={"price-quantity"}>
				<h2 className={"card-price"}>£{props.prix}</h2>
				<h5 className={"card-quantity"}>{props.quantite}</h5>
			</div>
		</div>
	)
}