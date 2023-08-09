import './styles/App.scss'
import {Main} from "./pages/Main.tsx";
import {ApolloProvider,ApolloClient,InMemoryCache} from "@apollo/client"


const client  = new ApolloClient({
    uri: 'http://localhost:8000/graphql',
    cache: new InMemoryCache(),
    /*headers: {

        'Content-Type': 'multipart/form-data'
    }*/
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main/>
    </ApolloProvider>
  )
}

export default App
