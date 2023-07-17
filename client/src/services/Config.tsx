interface Params {
    baseUrl: string
    headers : any
}
const config : Params = {
    baseUrl: "http://localhost:8000/produit",
    headers: {
        "Content-type": "application/json"
    }
};

export {config}