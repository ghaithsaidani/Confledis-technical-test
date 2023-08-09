import {FaSearch} from "react-icons/fa";
import {useEffect, useState} from "react";
import { search} from "../services/produit.service.tsx";
import { IconButton} from "@mui/material";
import {MdOutlineLibraryAdd} from "react-icons/md";
import {CardsSwiper} from "../components/CardsSwiper.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {GET_PRODUITS} from "../graphql/Produits.tsx";
import {useQuery} from "@apollo/client"
import {AddProduct} from "../components/add-product/AddProduct.tsx";

export const Main = () => {
    const [open, setOpen] = useState(false);
    const {data,loading} =useQuery(GET_PRODUITS)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };





    const [searchRef, setSearchRef] = useState('');
    /*const rechercher = (nom:string)=>{
        search(nom).then((res)=>{
            setProduits(res.data.produits)
        })
    }*/

    /*useEffect(() => {

        searchRef==="" ? getAllProducts() :rechercher(searchRef)
    }, [searchRef]);*/


    const handleChange = (evt:any) => {
            const value = evt.target.value;
            setSearchRef(value);
    }

    return (
        <main>
            <ToastContainer position="top-right" theme={"dark"} autoClose={2000}/>
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
            <CardsSwiper data={!loading ? data.produits : []}/>
            <AddProduct open={open} handleClose={handleClose}/>
        </main>
    )
}