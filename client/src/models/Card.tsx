import Image from "./Image.tsx";

export default interface Card {
    id:number,
    img: Image,
    nom:string,
    prix:number,
    quantite:number
}