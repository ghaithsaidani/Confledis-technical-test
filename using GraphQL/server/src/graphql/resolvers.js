import Produit from "../models/Produit.js";
import fs from "fs";
import {GraphQLUpload} from "graphql-upload";
import {finished} from "stream/promises"
import * as path from "path";

export const resolvers = {
    Upload:GraphQLUpload,
    Query:{
        produits:async ()=>{
            return await Produit.find();
        },
        produit:async (_,{_id})=>{
            return await Produit.findById(_id);
        },
        produitsRecherches:async(_, {nom})=>{
            return await Produit.find({nom:{$regex:nom}})
        },
    },
    Mutation:{
        addphoto: async (parent, { file }) => {
            const { createReadStream, filename, mimetype, encoding } = await file;

            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();

            // This is purely for demonstration purposes and will overwrite the
            // local-file-output.txt in the current working directory on EACH upload.
            const out = require('fs').createWriteStream('local-file-output.txt');
            stream.pipe(out);
            await finished(out);

            return { filename, mimetype, encoding };
        },
        CreerProduit:async (_,{nom,prix,quantite,img})=>{
            /*const imageUrl = await readFile(img)*/
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