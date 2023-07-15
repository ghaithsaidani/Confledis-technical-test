import ProduitController from "../controllers/produit.controller.js"
import express from 'express'


const router=express.Router();
router.post('/ajouter',ProduitController.create)
router.get('/getall',ProduitController.getAll)
//router.get('/getone/:id',ProduitController.getOne)
export default router;