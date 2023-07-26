import axios from "axios";


const Config=axios.create({
    baseURL: "http://localhost:8000/produit",
    headers: {
        "Content-type": "application/json",
        'Content-Type': 'multipart/form-data'
    }
});
export const getAll = () => {
    return Config.get('/getall')
}

export const add = (my_card:FormData)  =>{
    return Config.post( '/ajouter',my_card)
}

export const modify = (id:string,my_card:FormData)  =>{
    return Config.put( `/update/${id}`,my_card)
}

export const search = (nom:string)  =>{
    return Config.get( `/recherche/${encodeURIComponent(nom.trim())}`)
}

export const Delete =(id:string)  => {
    return Config.delete(`/delete/${id}`)
}

export const getOne = (id:string) => {
    return Config.get(`/getone/${id}`)
}