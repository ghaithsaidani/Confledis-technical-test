import Card from "../../models/Card.tsx";
import '../../styles/card.modules.scss'
import {Fade, IconButton, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import React from "react";
import {FiMoreVertical} from "react-icons/fi";
import {Delete, getOne} from "../../services/produit.service.tsx";
import {AiOutlineDelete, AiTwotoneEdit} from "react-icons/ai";
import {BsInfoCircle} from "react-icons/bs";

export const MyCard = (props: Card) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getProdByID = (_id:string) =>{
        getOne(_id).then(res=>{
            console.log(res.data.produit)
        })
    }

    const deleteById = (_id:string) => {
        Delete(_id).then(res=>{
            console.log(res.data.msg)
        })
    }
    return (
        <div className={"my-card"}>
            <img src={props.img} alt={props.nom}/>
            <div className={"card-name-settings"}>
                <h3 className={"card-name"}>{props.nom}</h3>
                <IconButton
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <FiMoreVertical/>
                </IconButton>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={()=>getProdByID(props._id)}>
                        <ListItemIcon>
                            <BsInfoCircle/>
                        </ListItemIcon>
                        <Typography variant="inherit">Voir details</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleClose}><ListItemIcon>
                        <AiTwotoneEdit/>
                    </ListItemIcon>
                        <Typography variant="inherit">Modifier</Typography></MenuItem>
                    <MenuItem onClick={()=>deleteById(props._id)}><ListItemIcon>
                        <AiOutlineDelete/>
                    </ListItemIcon>
                        <Typography variant="inherit">Supprimer</Typography></MenuItem>
                </Menu>
            </div>
            <div className={"price-quantity"}>
                <h2 className={"card-price"}>£{props.prix}</h2>
                <h5 className={"card-quantity"}>{props.quantite}</h5>
            </div>
        </div>
    )
}