import React from 'react';
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
      console.log('Response' ,res);
    }).catch(err => {
      console.log('Error',err);
    });
  }


function StripePayment() {
    return (
        <div>
            <StripeCheckout token={onToken} stripeKey={'pk_test_51HRwaOD2RnrZ3ZPxc9ypMN1VYXIy6Mi9mlTMKymg3rLHedr77Z3ziRKXQYJwPw7EzqFnJ2Ksl9U5sZXmfyCdaUat006BiVPX6c'} name={'product.name'} amount={/*product.price * 100*/20}>
                <button>Pay Here {/*product.price*/200}$</button>
            </StripeCheckout>
        </div>
    );
}

export default StripePayment;