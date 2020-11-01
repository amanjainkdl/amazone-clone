import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import uuid from 'uuid';
import AlertService from './components/AlertService';
import Cart from './components/Cart';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import firebase from './util/firebase';
import TwoStepVerification from './components/TwoStepVerification';
import StripePayment from './components/StripePayment';

function App() {

  useEffect(() => {
    if (countryName && countryName.length === 0) {
      fetch("https://api.ipdata.co?api-key=test").then(response => response.json()).then(data => {
        console.log("App.js wala", data);
        setCountryName(data.country_code);
      }
      );
    }
  });

  let initialProducts = [
    {
      id: 1,
      title: '1L Nature Crest 100% Pure Coconut Oil',
      subTitle: 'Nature crest',
      amount: 100,
      discountInPercent: 20,
      ratingStars: 5,
      isProduceAssured: true,
      productImageName: 'coconutOil.jpg',
      category: 'Car',
      quantity: 4
    },

    {
      id: 2,
      title: '500gAmazon Brand - Solimo Almonds',
      subTitle: 'Amazon Brand - Solimo',
      amount: 450,
      discountInPercent: 50,
      ratingStars: 2,
      isProduceAssured: false,
      productImageName: 'almond.jpg',
      category: 'Fashion',
      quantity: 6
    },

    {
      id: 3,
      title: '1L Amazon Brand - Vedaka Canola Oil Bottle',
      subTitle: 'Vedaka',
      amount: 200,
      discountInPercent: 30,
      ratingStars: 4,
      isProduceAssured: true,
      productImageName: 'vedaka.jpg',
      category: 'Car',
      quantity: 7
    },

    {
      id: 4,
      title: '1L Amazon Brand - Vedaka Canola Oil Bottle',
      subTitle: 'Vedaka',
      amount: 200,
      discountInPercent: 30,
      ratingStars: 4,
      isProduceAssured: true,
      productImageName: 'vedaka.jpg',
      category: 'dry-fruit',
      quantity: 2
    },

    {
      id: 5,
      title: '1L Amazon Brand - Vedaka Canola Oil Bottle',
      subTitle: 'Vedaka',
      amount: 200,
      discountInPercent: 30,
      ratingStars: 4,
      isProduceAssured: true,
      productImageName: 'vedaka.jpg',
      category: 'Car',
      quantity: 3
    },

    {
      id: 6,
      title: '1L Amazon Brand - Vedaka Canola Oil Bottle',
      subTitle: 'Vedaka',
      amount: 200,
      discountInPercent: 30,
      ratingStars: 4,
      isProduceAssured: true,
      productImageName: 'vedaka.jpg',
      category: 'dry-fruit',
      quantity: 8
    },

    {
      id: 7,
      title: '1L Amazon Brand - Vedaka Canola Oil Bottle',
      subTitle: 'Vedaka',
      amount: 200,
      discountInPercent: 30,
      ratingStars: 4,
      isProduceAssured: true,
      productImageName: 'vedaka.jpg',
      category: 'dry-fruit',
      quantity: 5
    }
  ];

  let initialItemsInCart = [];
  let [products, setProducts] = useState(initialProducts);
  let [anchor, setAnchor] = useState(true);
  let [itemInCart, setItemInCart] = useState(initialItemsInCart);
  const [user, setUser] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToAuth, setRedirectToAuth] = useState(false);
  const [isCaptchaAvailable, setIsCaptchaAvailable] = useState(false);
  const [userSignUpData, setUserSignUpData] = useState(null)
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantityInCart, setquantityInCart] = useState(new Map());

  let handleQuanatityInCart = (id) => {
    let quantity = document.getElementsByClassName(`select-quant-${id}`)[0].value;
    let newTempMap = new Map();
    quantityInCart.forEach((value, key) => { 
      newTempMap.set(key,value);
    });
    newTempMap.set(id,quantity);
    setquantityInCart(newTempMap);
  }

  let handleRedirectToLogin = (isRedirectToLoginNeeded) => {
    setRedirectToLogin(isRedirectToLoginNeeded);
  }

  let handleUserSignupDetails = (userSignUpData) => {
    setUserSignUpData(userSignUpData);
  }

  let handleSelectCategoryInNav = () => {
    let selectedCategoryInNav = document.getElementById('item-category').value;
    setSelectedCategory(selectedCategoryInNav);
    if (selectedCategoryInNav === 'All') {
      setProducts(initialProducts);
    } else {
      let tempProduct = initialProducts.filter(product => product.category === selectedCategoryInNav);
      console.log(tempProduct);
      setProducts(tempProduct);
    }
  }

  let handleRedirectToAuth = (isRedirectToAuthNeeded) => {
    setRedirectToAuth(isRedirectToAuthNeeded);
  }

  let handleIsCaptchaAvailable = (isCaptchaAvailable) => {
    setIsCaptchaAvailable(isCaptchaAvailable);
  }

  let handleCountryName = (country_name) => {
    setCountryName(country_name);
  }

  let hanldeAnchor = () => {
    setAnchor(!anchor);
  }

  let handleCartCount = (id) => {
    if (!itemInCart.includes(id)) {
      itemInCart.push(id);
      setItemInCart([...itemInCart], id);
    } else {
      itemInCart.forEach((item, index) => {
        if (item === id) {
          itemInCart.splice(index, 1);
          setItemInCart([...itemInCart]);
          quantityInCart.delete(id);
        }
      });
    }
  }

  let handleUserName = (name) => {
    setUserName(name);
  }

  let handleSignInSubmit = (values) => {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(u => {
      setUser(u.user);
      handleUserName(u.user.displayName);
    }).catch(err => {
      handleSetError(err.message);
    });
  }

  let handleSetError = (errorMsg) => {
    setError(errorMsg);
    setInterval(() => {
      setError(false);
    }, 6000);
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {
              // !user ?
              false ?
                (<Redirect to="/login" />) :
                <>
                  <Header hanldeAnchor={hanldeAnchor} anchor={anchor} numberOfItemsInCart={itemInCart.length} userName={userName} handleSelectCategoryInNav={handleSelectCategoryInNav} />
                  <Home products={products} handleCartCount={handleCartCount} itemInCart={itemInCart} />
                </>
            }
          </Route>
          <Route exact path="/login">
            {
              console.log('user', user)
            }
            {!user ? <LoginForm handleSignInSubmit={handleSignInSubmit} handleRedirectToLogin={handleRedirectToLogin} error={error} handleRedirectToAuth={handleRedirectToAuth} />
              : (<Redirect to="/" />)}
          </Route>
          <Route exact path="/checkout">
            <Header hanldeAnchor={hanldeAnchor} anchor={anchor} numberOfItemsInCart={itemInCart.length} userName={userName} />
            <Cart itemInCart={itemInCart} products={initialProducts} handleCartCount={handleCartCount}
              handleQuanatityInCart={handleQuanatityInCart} quantityInCart={quantityInCart} />
          </Route>
          <Route exact path="/signup">
            {redirectToAuth ? (<Redirect to="/auth" />) :
              <SignUp countryName={countryName} handleCountryName={handleCountryName}
                handleRedirectToLogin={handleRedirectToLogin} handleRedirectToAuth={handleRedirectToAuth}
                setIsCaptchaAvailable={setIsCaptchaAvailable} handleSetError={handleSetError} error={error}
                handleUserSignupDetails={handleUserSignupDetails}
              />
            }
          </Route>
          <Route exact path="/auth">
            {!redirectToAuth ? (<Redirect to="/signup" />) : redirectToLogin ? (<Redirect to="/login" />) :
              <TwoStepVerification isCaptchaAvailable={isCaptchaAvailable} error={error}
                userSignUpData={userSignUpData} handleRedirectToLogin={handleRedirectToLogin} handleUserName={handleUserName}/>
            }
          </Route>
          <Route exact path="/payment">
          <StripePayment />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
