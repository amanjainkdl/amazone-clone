import React from 'react'
import '../style/Cart.css'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart';
import { FaRupeeSign } from "react-icons/fa";
import StripeCheckout from 'react-stripe-checkout';

const onToken = (token) => {
    console.log(token);
    let body = {
        token
        //   product
    };

    let headers = {
        "Content-type": "application/json"
    };

    return fetch('http://127.0.0.1:8080/payment', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    }).then(res => {
        console.log('Response', res);
    }).catch(err => {
        console.log('Error', err);
    });
}

function Cart({ itemInCart, products, handleCartCount, handleQuanatityInCart, quantityInCart }) {
    let totalAmount = 0;
    let actualPriceTotal = 0;
    let totalDiscount = 0;
    return (
        <div className="cart-main-box">
            <h2 className="cart-heading">Shopping Cart</h2>
            {
                itemInCart.length > 0 ? <div className="cart-item-container">
                    {
                        itemInCart.map(item => {
                            let cartItem = products.find(cartProduct => {
                                if (cartProduct.id === item) {
                                    let qunatityOfProduct = quantityInCart.has(item) ? quantityInCart.get(item) : 1;
                                    totalAmount += qunatityOfProduct *
                                        (cartProduct.amount - ((cartProduct.discountInPercent / 100) * cartProduct.amount));
                                    actualPriceTotal += qunatityOfProduct * cartProduct.amount;
                                    totalDiscount += cartProduct.discountInPercent;
                                    return true;
                                }
                            });
                            return <CartItem key={item} cartItem={cartItem} handleCartCount={handleCartCount}
                                handleQuanatityInCart={handleQuanatityInCart} quantityInCart={quantityInCart} />
                        })
                    }
                    <div className="total-amount-box">
                        <div className="total-amount-details">
                            <span>Total Items : {itemInCart.length}</span>
                            <span>Actual Total Amount : {actualPriceTotal}<FaRupeeSign className="rupee-icon" /></span>
                            <span>Total Disount : {actualPriceTotal - totalAmount}<FaRupeeSign className="rupee-icon" /></span>
                            <span>Total Amount : {totalAmount}<FaRupeeSign className="rupee-icon" /></span>
                        </div>
                        <div className="total-amt-checkout-box">
                            <StripeCheckout token={onToken} stripeKey={'pk_test_51HRwaOD2RnrZ3ZPxc9ypMN1VYXIy6Mi9mlTMKymg3rLHedr77Z3ziRKXQYJwPw7EzqFnJ2Ksl9U5sZXmfyCdaUat006BiVPX6c'} name={'product.name'} amount={/*product.price * 100*/totalAmount * 100}>
                                <button className="checkout-btn">Pay Here {/*product.price*/totalAmount}$</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
                    :
                    <EmptyCart />
            }
        </div>
    )
}

export default Cart
