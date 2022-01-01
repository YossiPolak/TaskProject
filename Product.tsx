import { FC } from 'react'
import { product } from './App'

const Product: FC<product> = props => {
    return <div>
        <h2>Category: {props.category}</h2>
        <h1>{props.title}</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '400px 400px', gap: '20px' }}>
            <img src={props.image} width='300px' />
            <div>

                <h2>{props.description}</h2>
                <p>Price: {props.price}</p>
                <p>Rating: {props.rating.rate}, Count: {props.rating.count}</p>
            </div>
        </div>
        <a href='#/Home'>Back To List</a>
    </div>
}
export default Product