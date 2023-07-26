import {gql} from "graphql-tag"

export const typeDefs = gql`
    type Query{
        produits:[Produit]
        produit(_id: ID!):Produit
        produitsRecherches(nom:String!):[Produit]
    }
    
    type Mutation{
        CreerProduit(nom: String!, prix: Float!, quantite:Int!,img:String!): Produit
        ModifierProduit(_id: ID!, nom: String!, prix: Float!, quantite:Int!,img:String!): Produit
        SupprimerProduit(_id: ID!): Produit
    }
    
    type Produit{
        _id:ID!
        nom:String!
        prix:Float!
        quantite:Int!
        img:String!
    }
`