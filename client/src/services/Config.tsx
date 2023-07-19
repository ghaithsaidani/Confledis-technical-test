import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8000/produit",
    headers: {
        "Content-type": "application/json",
        'Content-Type': 'multipart/form-data'
    }
});
