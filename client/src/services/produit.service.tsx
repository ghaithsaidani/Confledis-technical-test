import Config from "./Config.tsx";

export const getAll = () : Promise<any> => {
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

export const Delete =(id:string) : Promise<any> => {
    return Config.delete(`/delete/${id}`)
}

export const getOne = (id:string) : Promise<any> => {
    return Config.get(`/getone/${id}`)
}