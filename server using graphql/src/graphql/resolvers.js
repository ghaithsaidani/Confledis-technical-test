import Produit from "../models/Produit.js";
import fs from "fs";

export const resolvers = {
    Query:{
        produits:async ()=>{
            return await Produit.find();
        },
        produit:async (_,{_id})=>{
            return await Produit.findById(_id);
        },
        produitsRecherches:async(_, {nom})=>{
            return await Produit.find({nom:{$regex:nom}})
        }
    },
    Mutation:{
        CreerProduit:async (_,{nom,prix,quantite,img})=>{
            const prod=new Produit({
                nom,
                prix,
                quantite,
                img
            })
            const prodcree=prod.save();
            return prodcree
        },
        ModifierProduit:async (_,args)=>{
            const prod=await Produit.findByIdAndUpdate(
                args._id,
                args,
                {new:true}
            )
            if(!prod) throw new Error("Produit introuvable")
            return prod
        },
        SupprimerProduit:async(_,_id)=>{
            let imgId=""
            const produit=await Produit.findById(_id);
            imgId=produit.img
            const DIR = `../client/public/uploads/${imgId}`;
            const prod=await Produit.findByIdAndDelete(_id)
            fs.unlinkSync(DIR);
            if(!prod) throw new Error("Produit introuvable")
            return prod
        },

    },
    Produit:{

    }
}