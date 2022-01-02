import { FC, useState } from 'react'
import { useEffect } from 'react';
import { product } from './App'

interface homeProps {
    searchText: string,
    products: product[],
    onChange: (text: string) => void,
    //results:product[],
    //setResults:(results:product[]) => void
}

const Home: FC<homeProps> = props => {
    const [showAll, setShowAll] = useState(false);
    var results = props.searchText ? props.products.filter(x => x.title.includes(props.searchText) || x.description.includes(props.searchText)) : [];
    var showResults = showAll ? results : results.slice(0, 5);

    function handleSearch(text: string) {
        props.onChange(text);
        setShowAll(false);
    }

    function handleSelect(id: number) {
        window.location.href = '#/Product/' + id
    }
    return <div>
        <h1>Fake Store</h1>
        <input value={props.searchText} placeholder="Search Product" onChange={e => handleSearch(e.currentTarget.value)} />
        {showResults.map(p => <div
            style={{ display: 'grid', gridTemplateColumns: '70px auto', gap: 10, padding: 5 }}
            key={p.id}
            onClick={e => handleSelect(p.id)}            >
            <img src={p.image} height='40px' />
            <span>{p.title}</span>
        </div>
        )}
        {!showAll && results.length > 5 && <option key='more' onClick={e => setShowAll(true)}>More...</option>}
    </div>
}
export default Home;

