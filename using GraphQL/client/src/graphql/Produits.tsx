import {gql} from "@apollo/client"
export const GET_PRODUITS = gql`
		query getProduits{
            produits {
                _id
                nom
                prix
                quantite
                img
            }
		}
`;

export const GET_PRODUIT =gql`
	query getProject($id:ID!){
		project(_id:$id){
			_id
			nom
			prix
			quantite
			img
		}
	}
`

export const CREATE_PRODUIT=gql`
	mutation creerProduit($nom: String!, $prix: Float!, $quantite:Int!,$img:String!){
		CreerProduit(nom:$nom,prix: $prix, quantite:$quantite,img:$img){
			_id
			nom
			prix
			quantite
			img
		}
	}
`

export const DELETE_PRODUIT=gql`
	mutation supprimerProduit($id:ID!){
		SupprimerProduit(_id:$id){
			_id
		}
	}
`

export const UPDATE_PRODUIT=gql`
	mutation modifierProduit($id:ID!,$nom: String!, $prix: Float!, $quantite:Int!,$img:String!){
		ModifierProduit(_id:$id,nom:$nom,prix: $prix, quantite:$quantite,img:$img){
			_id
			nom
			prix
			quantite
			img
		}
	}
`

