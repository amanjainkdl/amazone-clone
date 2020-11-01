import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function CartItem({ cartItem, handleCartCount, handleQuanatityInCart, quantityInCart }) {

    let ratingMap = [];
    let fillStar = cartItem.ratingStars;
    for (let i = 1; i <= 5; i++) {
        i <= fillStar ? ratingMap.push(<AiFillStar key={i} className="rating-color" />) : ratingMap.push(<AiOutlineStar key={i} className="rating-color" />)
    }

    let quantity = [];
    for (let i = 1; i <= cartItem.quantity; i++) {
        quantity.push(<option key={i}>{i}</option>);
    }

    let selectedQuanity = quantityInCart.has(cartItem.id) ? quantityInCart.get(cartItem.id) : 1 ;

    return (
        <div className="cart-item">
            <div className="left">
                <img className="cart-item-img" src={`../img/${cartItem.productImageName}`} />
            </div>
            <div className="right">
                <p>{cartItem.title}</p>
                <p><i>{cartItem.subTitle}</i></p>
                <p>Actual price : <del>{cartItem.amount + ' Rs.'}</del></p>
                <p>Current price : <strong>{cartItem.amount - ((cartItem.discountInPercent / 100) * cartItem.amount) + ' Rs.'}</strong></p>
                <div className="rating-box">
                    {
                        ratingMap.map(item => item)
                    }
                </div>
                <div className="quantity-box">
                    <span>Quantity</span>
                    <select className={`select-quantity select-quant-${cartItem.id}`} key={cartItem.id} onChange={()=>handleQuanatityInCart(cartItem.id)}>
                        {
                            quantity.map(item => item)
                        }
                    </select>
                </div>
                <button className="cart-remove-item-btn" onClick={() => handleCartCount(cartItem.id)}>
                    Remove
                </button>
            </div>
            <div className="total-price-of-product">
                <h4>
                    {`${selectedQuanity} * 
                    ${cartItem.amount - ((cartItem.discountInPercent / 100) * cartItem.amount)} Rs = 
                    ${selectedQuanity * (cartItem.amount - ((cartItem.discountInPercent / 100) * cartItem.amount))} Rs`}
                </h4>
            </div>
        </div>
    )
}

export default CartItem
