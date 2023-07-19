import {FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import {getAll, search} from "../services/produit.service.tsx";
import {IconButton} from "@mui/material";
import {AddProduct} from "../components/add-product/AddProduct.tsx";
import {MdOutlineLibraryAdd} from "react-icons/md";
import {CardsSwiper} from "../components/CardsSwiper.tsx";

export const Main = () => {
    const [produits, setProduits] = useState([]);
    const [open, setOpen] = useState(false);


    const getAllProducts =  () => {
        getAll().then((response) => {
            setProduits(response.data.produits);
        }).catch((error) => {
            console.log(error);
        })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    const [searchRef, setSearchRef] = useState('');
    const rechercher = (nom:string)=>{
        search(nom).then((res)=>{
            setProduits(res.data.produits)
        })
    }

    useEffect(() => {
        searchRef==="" ? getAllProducts() :rechercher(searchRef)
    }, [searchRef]);


    const handleChange = (evt:any) => {
            const value = evt.target.value;
            setSearchRef(value);
    }

    return (
        <main>
            <div className={"search-add"}>
                <div className="search">
                    <input type="text" id={"search"} name={"search"} placeholder="Rechercher un produit" onChange={handleChange} value={searchRef} />
                    <button>
                        <FaSearch/>
                    </button>
                </div>
                <IconButton onClick={handleClickOpen}>
                    <MdOutlineLibraryAdd/>
                </IconButton>
            </div>
            <CardsSwiper products={produits} setProduits={setProduits}/>
            <AddProduct open={open} setProduits={setProduits} handleClose={handleClose}/>
        </main>
    )
}