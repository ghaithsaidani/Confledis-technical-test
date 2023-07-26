import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";


export async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    dotenv.config();
    const allowedDomains = "http://localhost:5173"
    const corsOptions = {
        origin: allowedDomains,
        credentials: true
    };
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();

    app.use("/produit", cors(corsOptions), express.json(), expressMiddleware(server));

    await new Promise((resolve) => httpServer.listen({ port: process.env.PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
}