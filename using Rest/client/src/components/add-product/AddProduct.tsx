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
import FormProps from "../../models/FormProps.tsx";
import { useState} from "react";
import '../../styles/dialog.modules.scss'
import {add, getAll} from "../../services/produit.service.tsx";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";

export const AddProduct = (props: any) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        nom: "",
        image: "",
        quantite: 0,
        prix: 0
    });

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
        setLoading(true)
        e.preventDefault();
        const formData = new FormData()
        formData.append('nom', state.nom)
        formData.append('prix', state.prix.toString())
        formData.append('quantite', state.quantite.toString())
        formData.append('img', state.image)

        add(formData).then((response) => {
            setLoading(false)
            toast.success(response.data.msg);
            getAll().then((response) => {
                props.setProduits(response.data.produits);

            }).catch((error) => {
                console.log(error);
            })
            props.handleClose()
        }).catch((error)=>toast.error(error.data.msg))

    }


    const forms: FormProps[] = [
        {
            id: "nom",
            label: "Nom du Produit",
            type: "name",
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
                            disabled={state.nom==="" || state.image==="" || state.quantite===0 || state.prix===0}
                        >
                            Ajouter
                        </LoadingButton>
                    </DialogActions>

                </form>
            </DialogContent>

        </Dialog>
    )
}