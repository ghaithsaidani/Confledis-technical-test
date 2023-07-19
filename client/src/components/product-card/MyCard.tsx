import '../../styles/card.modules.scss'
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Fade,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography, useMediaQuery, useTheme
} from "@mui/material";
import React, { useState} from "react";
import {FiMoreVertical} from "react-icons/fi";
import {Delete, getAll} from "../../services/produit.service.tsx";
import {AiOutlineDelete, AiTwotoneEdit} from "react-icons/ai";
import {Transition} from "../Transition.tsx";
import {ModifyProduct} from "../modify-product/ModifyProduct.tsx";
import {LoadingButton} from "@mui/lab";


export const MyCard = (props: any) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [openDeleteDialog, setOpenDialog] = React.useState(false);
    const [openModify, setOpenModify] = useState(false);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
        handleClose()
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleOpenModify = () => {
        setOpenModify(true);
    };

    const handleCloseModify = () => {
        setOpenModify(false);
    };

    const deleteById = (_id: string) => {
        setLoading(true)
        Delete(_id).then(() => {
            getAll().then((response) => {
                props.setProduits(response.data.produits);
                setLoading(false)
                handleCloseDialog()
            }).catch((error) => {
                console.log(error);
            })
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
                    <MenuItem onClick={() => {
                        handleClose()
                        handleOpenModify()
                    }}><ListItemIcon>
                        <AiTwotoneEdit/>
                    </ListItemIcon>
                        <Typography variant="inherit">Modifier</Typography></MenuItem>
                    <MenuItem onClick={handleClickOpenDialog}><ListItemIcon>
                        <AiOutlineDelete/>
                    </ListItemIcon>
                        <Typography variant="inherit">Supprimer</Typography></MenuItem>
                </Menu>
            </div>
            <div className={"price-quantity"}>
                <h2 className={"card-price"}>£{props.prix}</h2>
                <h5 className={"card-quantity"}>{props.quantite}</h5>
            </div>
            <Dialog
                fullScreen={fullScreen}
                open={openDeleteDialog}
                TransitionComponent={Transition}
                onClose={handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Suppression du produit?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous supprimer {props.nom} de la liste des produit ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus variant={"outlined"} onClick={handleCloseDialog}>
                        Annuler
                    </Button>
                    <LoadingButton
                        disableElevation
                        loading={loading}
                        variant="contained"
                        onClick={() => {
                            deleteById(props._id)
                        }}
                    >
                        Confirmer
                    </LoadingButton>
                </DialogActions>
            </Dialog>
            <ModifyProduct open={openModify} _id={props._id} setProduits={props.setProduits}
                           handleClose={handleCloseModify}/>
        </div>
    )
}