import mongoose from "mongoose";



const Produit=new mongoose.Schema({
        nom: {
            type:String
        },
        prix:{
            type:Number
        },
        quantite:{
            type:Number
        },
    },
    {collection : "produits"},
)

export default mongoose.model("Produit", Produit);