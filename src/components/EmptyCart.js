import React from 'react'
import { Link } from 'react-router-dom'

function EmptyCart() {
    return (
        <div className="empty-cart">
            <div class="empty-cart-left-div">
                <div className="empty-card-left-text">
                    <h2>Oops :(</h2>
                    <h3>Your Amazon Cart is empty</h3>
                    <p>You have no items in your shopping cart.</p>
                    <p>Let's go and buy something.</p>
                    <Link to="/">
                        <button className="empty-cart-btn">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>
            <img className="empty-cart-img" src={`../img/empty1.png`}></img>
        </div>
    )
}

export default EmptyCart
