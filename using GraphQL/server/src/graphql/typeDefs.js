import {gql} from "graphql-tag"

export const typeDefs = gql`
    scalar Upload
    type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
    type Query{
        produits:[Produit]
        produit(_id: ID!):Produit
        produitsRecherches(nom:String!):[Produit]
    }
    
    type Mutation{
        CreerProduit(nom: String!, prix: Float!, quantite:Int!,img:String!): Produit
        ModifierProduit(_id: ID!, nom: String!, prix: Float!, quantite:Int!,img:String!): Produit
        SupprimerProduit(_id: ID!): Produit
        addphoto(file:Upload!):File!
    }
    
    type Produit{
        _id:ID!
        nom:String!
        prix:Float!
        quantite:Int!
        img:String!
    }
`