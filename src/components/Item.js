import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

function Item({ product, handleCartCount, itemInCart }) {

    let ratingMap = [];
    let fillStar = product.ratingStars;
    for (let i = 1; i <= 5; i++) {
      i <= fillStar ? ratingMap.push(<AiFillStar key={i} className="rating-color"/>) : ratingMap.push(<AiOutlineStar key={i} className="rating-color"/>)
    }
    
    return (
        <div className={`item ${itemInCart.includes(product.id) ? 'cart-item-border' : ''}`}>
            {/* todo : add currency acc. to user locale */}
            {itemInCart.includes(product.id) ? <div className="cart-status-box">
                <div className="cart-status">
                    <h5>Added to cart</h5>
                </div>
            </div> : null}
            <p className="title">{product.title}</p>
            <p><i>{product.subTitle}</i></p>
            <p>Actual price : <del>{product.amount + ' Rs.'}</del></p>
            <p>Current price : <strong>{product.amount - ((product.discountInPercent / 100) * product.amount) + ' Rs.'}</strong></p>
            <div className="rating-box">
                {
                 ratingMap.map(item =>  item)
                }
            </div>
            <div className="image-btn">
                <div className="img-div">
                    <img src={`../img/${product.productImageName}`}></img>
                </div>
                <button className="cart-btn" onClick={() => handleCartCount(product.id)}>                    
                    {`${itemInCart.includes(product.id) ? 'Remove from cart' : 'Add to cart'}`}
                </button>
            </div>
        </div>
    )
}

export default Item