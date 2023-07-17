
import axios from "axios";
import {config} from "./Config.tsx";

export const getAll = async () : Promise<any> => {
    return await axios({
        ...config,
        url:`${config.baseUrl}/getall`,
        method:"get"
    })
}

export const Delete = async (id:string) : Promise<any> => {
    return await axios({
        ...config,
        url:`${config.baseUrl}/delete/${id}`,
        method:"delete"
    })
}

export const getOne = async (id:string) : Promise<any> => {
    return await axios({
        ...config,
        url:`${config.baseUrl}/getone/${id}`,
        method:"get"
    })
}