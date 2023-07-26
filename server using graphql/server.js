import express, {json} from 'express';
import connectDB from "./src/config/connectDb.js";
import cors from 'cors';
import dotenv from "dotenv";
import produits from './src/routes/produit.route.js';
import {startApolloServer} from "./app.js";
import {typeDefs} from "./src/graphql/typeDefs.js";
import {resolvers} from "./src/graphql/resolvers.js";
let app = express();
dotenv.config();
/*const allowedDomains = "http://localhost:5173"
const corsOptions = {
    origin: allowedDomains,
    credentials: true
};
app.use(cors(corsOptions))
app.use(json())

app.use('/produit',produits)*/

connectDB()
startApolloServer(typeDefs,resolvers)


// Creating server
/*
const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server running at port: " + port);
});*/
