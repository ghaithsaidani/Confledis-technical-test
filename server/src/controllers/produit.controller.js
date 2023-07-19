import Produit from "../models/Produit.js";
import * as fs from "fs";



class ProduitController{
    async create(req,res){
        try{
            let product=new Produit({
                nom:req.body.nom,
                prix:req.body.prix,
                quantite:req.body.quantite,
                img:req.file.filename
            })
            await product.save()
            return res.json({ success: true, msg: 'produit ajouté avec succes' });
        }
        catch(error){
            return res.status(400).json({success:false,msg:"echec d'ajout du produit"})
        }
    }

    async getAll(req,res){
        try{
            const produits=await Produit.find();
            return res.json({success:true,produits})
        }
        catch(error){
            return res.status(400).json({success:false,msg:"echec de recuperation des produits"})
        }
    }

    async getOne(req,res){
        try{
            const produit=await Produit.findById(req.params.id);
            return res.json({success:true,produit})
        }catch(error){
            return res.status(400).json({success:false,msg:"echec de recuperation du produit"})
        }
    }

    async update(req,res){
        try {
            const product=await Produit.findById(req.params.id).exec();
            product.set(req.body);
            await product.save();
            return res.json({ success: true, msg: 'mise a jour du produit avec succes' });
        } catch (error) {
            res.status(400).json({ success: false, msg: "echec de mise a jour du produit" });
        }
    }

    async delete(req,res){
        try {
            let imgId=""
            const produit=await Produit.findById(req.params.id);
            imgId=produit.img
            const DIR = `../client/public/uploads/${imgId}`;
            await Produit.findByIdAndDelete(req.params.id);
            fs.unlinkSync(DIR);
            return res.json({ success: true, msg: 'suppression du produit avec succes' });
        } catch (error) {
            res.status(400).json({ success: false, msg: "echec de suppression du produit" });
        }
    }

    async search(req,res){
        try {
            const produits=await Produit.find({nom:{$regex:req.params.nom}})
            return res.json({success:true,produits})
        } catch (error) {
            return res.status(400).json({success:false,msg:"echec de recherche du produit"})
        }
    }


}


export default new ProduitController;

