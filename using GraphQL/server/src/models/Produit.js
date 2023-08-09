import mongoose from "mongoose";

class File {
    constructor(filename, mimetype, encoding) {
        this.filename=filename
        this.mimetype=mimetype
        this.encoding=encoding
    }
}

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
        img:{
            type:String
        }
    },
    {collection : "produits"},
)

export default mongoose.model("Produit", Produit);