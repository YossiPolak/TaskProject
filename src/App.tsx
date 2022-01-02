import React, { useEffect, useState } from 'react';
import Home from './Home';
import Product from './Product';
import Login from './Login';
import axios from 'axios'

export interface product {
    id: number,
    title:string,
    price:string,
    category:string,
    description:string,
    image:string,
    rating: { rate: number, count: number }
}
function App() {
    const [route, setRoute] = useState(window.location.hash.substring(1));
       const [logged, setLogged] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState<product[]>([]);
    const [results, setResults] = useState<product[]>();

    useEffect(() => {
        window.addEventListener('hashchange', () => { setRoute(window.location.hash.substring(1)) })
    }, []);

    useEffect(() => {
        if (logged) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [logged])

    async function fetchProducts() {
        var res= await axios.get('https://fakestoreapi.com/products');
        var p:product[]= res.data
        console.log(res)
        setProducts(p);
    }

    function handleLogin(){setLogged(true)} 

    const home = <Home
        products={products}
        searchText={searchText}
        onChange={setSearchText}/>

    const getChild = () => {
        console.log(route)
        var arr = route.split('/')
        switch (arr[1]) {
            case 'Home':
                return home;
            case 'Product':
                    var prdct = products.find(x => x.id == +arr[2])
                    if(prdct) return <Product {...prdct} />;
                break;
            default:
                return home;
        }
    }
    return (
        <div className="App">
            {logged ? getChild() :
                <Login handleLogin={handleLogin}/>}

        </div>
    );
}
export default App;