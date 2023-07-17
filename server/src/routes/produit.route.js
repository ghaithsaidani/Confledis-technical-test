import ProduitController from "../controllers/produit.controller.js"
import express from 'express'
import multer from "multer";

const DIR = '../client/public/uploads/';

const router=express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        let fl = Date.now() + '.' + file.mimetype.split('/')[1];
        cb(null, fl);
    },
});

const upload = multer({ storage: storage });
router.post('/ajouter',upload.single("img"),ProduitController.create)
router.get('/getall',ProduitController.getAll)
router.get('/getone/:id',ProduitController.getOne)
router.put('/update/:id',ProduitController.update)
router.delete('/delete/:id',ProduitController.delete)
export default router;