import React from 'react'
import amazonPoster from '../resources/amzoneprime.jpg'
import '../style/Home.css'
import Item from './Item'
import NoItemInCategory from './NoItemInCategory'
function Home({products, handleCartCount, itemInCart}) {
    return (
        <div className="home">
        <img src={amazonPoster} className="amazon-poster" alt='amazon poster' />
        <div className="items-container">
            { products.length > 0 ?
               products.map(product => {
                 return <Item key={product.id} product={product} handleCartCount={handleCartCount} itemInCart={itemInCart}/>
               }) : <NoItemInCategory/>
            }
        </div>
        </div>
    )
}

export default Home
