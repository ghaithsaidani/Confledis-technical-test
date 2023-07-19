import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl, FormGroup, TextField,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Transition} from "../Transition.tsx";
import {useCallback, useEffect, useState} from "react";
import '../../styles/dialog.modules.scss'
import {LoadingButton} from "@mui/lab";
import {getAll, getOne, modify} from "../../services/produit.service.tsx";

export const ModifyProduct = (props: any) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        nom: "",
        image: "",
        quantite: 0,
        prix: 0,
    });

    const getProdByID = useCallback(
        (_id: string) => {
            getOne(_id).then(res => {
                let prod = res.data.produit
                setState(
                    {
                        nom: prod.nom,
                        image: prod.img,
                        quantite: prod.quantite,
                        prix: prod.prix,
                    }
                )
            })

        },
        [state],
    );

    useEffect(() => {
        getProdByID(props._id)
    }, []);

    const forms=[
        {
            id: "nom",
            label: "Nom du Produit",
            type: "text",
        },
        {
            id: "prix",
            label: "Prix",
            type: "number",
        },
        {
            id: "quantite",
            label: "Quantite",
            type: "number",
        },
        {
            id: "image",
            label: "Image",
            type: "file",
        },
    ];


    const handleChange = (evt:any) => {
        if(!evt.target.files){
            const value = evt.target.value;
            setState({
                ...state,
                [evt.target.name]: value,
            });
        }else{
            setState({
                ...state,
                image:evt.target.files[0],
            });
        }
    };

    const handleSubmit = (e:any) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('nom', state.nom)
        formData.append('prix', state.prix.toString())
        formData.append('quantite', state.quantite.toString())
        formData.append('img', state.image)
        modify(props._id,formData).then(() => {
            getAll().then((response) => {
                props.setProduits(response.data.produits);
                setLoading(false)
                props.handleClose()
            }).catch((error) => {
                console.log(error);
            })
        })

    }





    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent>
                <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-1 flex-col"
                >
                    {forms.map((form) => (
                        <FormGroup key={form.id}>
                            <FormControl variant="outlined">
                                <TextField
                                    id={form.id}
                                    name={form.id}
                                    type={form.type}
                                    value={form.id==="nom" ? state.nom : form.id ==="prix" ? state.prix : form.id==="quantite" ? state.quantite : ""}
                                    onChange={handleChange}
                                    label={form.id==="image" ? "" : form.label}
                                    variant="outlined"
                                    margin="normal"
                                />
                            </FormControl>
                        </FormGroup>
                    ))}

                    <DialogActions className={"actions"}>
                        <Button onClick={props.handleClose} variant={"outlined"}>Annuler</Button>
                        <LoadingButton
                            disableElevation
                            loading={loading}
                            variant="contained"
                            type="submit"
                        >
                            Modifier
                        </LoadingButton>
                    </DialogActions>

                </form>
            </DialogContent>
        </Dialog>
    )
}