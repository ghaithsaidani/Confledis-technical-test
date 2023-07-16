import Produit from "../models/Produit.js";



class ProduitController{
    async create(req,res){
        try{
            const produit=new Produit({...req.body})
            await Produit(produit).save();
            return res.json({success:true,msg:'produit ajouté avec succés'})
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
            await Produit.findByIdAndDelete(req.params.id);
            return res.json({ success: true, msg: 'suppression du produit avec succes' });
        } catch (error) {
            res.status(400).json({ success: false, msg: "echec de suppression du produit" });
        }
    }
}


export default new ProduitController;


/* export default ajouterProduit = (req, res) => {
  //let { nom,prix,quantite } = req.body;

  Produit.create(req.body)
    .then((prod) => {
      res.json(prod);
    })
    .catch((err) => res.json(err));
  /* try {
        let produit=await Produit.findOne({nom})
        if(produit){
            return next(new ErrorResponse('Numero Terrain Existe', 400))
        }
        else{
            let produit = new Produit();
            produit.nom = nom;
            produit.prix=prix;
            produit.quantite=quantite
            produit.save((err, prd) => {
                if (err) {
                    return res.status(400).send({
                        message: err,
                    });
                } else {

                    return res.status(201).send({
                        success: true,
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
}; */
