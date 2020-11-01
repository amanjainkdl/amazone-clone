import React, { useEffect } from 'react'
import '../style/LoginForm.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import Option from '../components/Option'
import firebase from '../util/firebase'
import { AiOutlineWarning } from 'react-icons/ai'

let initialValues = {
    name: '',
    email: '',
    mobile: {
        code: '',
        number: ''
    },
    password: ''
}

// let onSubmit = (values) => firebase.auth().createUserWithEmailAndPassword(values.email,values.password)
// .then( ()=> {
//     var user = firebase.auth().currentUser;
//     console.log(values.mobile.number);
//     user.updateProfile({
//       'phoneNumber' : +918696181616,
//       'displayName' : values.name
//     }).then(function() {
//         console.log('Updated successfully');
//     }, function(error) {
//         console.log(error);
//    });
// })

let validate = (values) => {
    let errors = {}
    if (!values.name) {
        errors.name = 'Enter your name.';
    }
    if (!values.email) {
        errors.email = 'Enter your email.';
    }
    if (!values.password) {
        errors.password = 'Enter your password';
    }
    return errors;
}

function SignUp({ countryName, handleCountryName, 
    handleRedirectToAuth, setIsCaptchaAvailable, handleSetError, error, handleUserSignupDetails}) {
    
    let onSubmit = (values) => {
        handleRedirectToAuth(true);
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
        let mobNumber = '+91'+values.mobile.number;
        firebase.auth().signInWithPhoneNumber(mobNumber, recaptcha).then((e) => {
            setIsCaptchaAvailable(true);
            handleUserSignupDetails(values);
            window.authObj = e;
        }).catch(error => {
            handleRedirectToAuth(false);
            handleSetError("Something went wrong, please retry.");
        });
    }

    return (
        <div>
            <div>
                <div className="login-nav">
                    <img className="login-nav-img" src={`../img/amazonlogo.png`} />
                </div>        
                {error ? 
                <div className='error-box'>
                    <div className="error-left">
                        <AiOutlineWarning className="danger"/>
                    </div>
                    <div className="error-right">
                        <h4 className="error-heading">There was a problem</h4>
                        {error}
                    </div>
                </div> : null}        
                <div className="login-main-container">
                    <div className="login-form-container">
                        <p className="form-heading">Create account</p>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                            <Form className="form mt-15">

                                <label htmlFor='name'>Your name</label>
                                <Field id="name" name="name" className="login-form-input mt-4" />
                                <div className="error">
                                    <ErrorMessage name="name" />
                                </div>

                                <div className="phone-num-field">
                                    <Field as="select" id='mobileCode' name='mobile.code' className="login-form-input mt-4" >
                                        <Option countryName={countryName} handleCountryName={handleCountryName} />
                                    </Field>
                                    <Field type="number" id="mobileNumber" name="mobile.number" className="login-form-input mt-4" placeholder="Mobile Number" />
                                    <div className="error">
                                        <ErrorMessage name="mobile.number" />
                                    </div>
                                </div>

                                <label htmlFor='email'>Email</label>
                                <Field type="email" id="email" name="email" className="login-form-input mt-4" />
                                <div className="error">
                                    <ErrorMessage name="email" />
                                </div>

                                <label htmlFor='password' className="mt-10">Password</label>
                                <Field type="password" id="password" name="password" placeholder="Atleast 6 characters" className="login-form-input mt-4" />
                                <p className="f-12 mt-4">Passwords must be at least 6 characters.</p>
                                <div className="error">
                                    <ErrorMessage name="password" className="error" />
                                </div>

                                <br />                                
                                <button type="submit" className="login-form-input login-form-btn">Continue</button>
                                <span>
                                    <p className="f-13 mt-15">
                                        We will send you a text to verify your phone.
                                </p>
                                    <p className="f-13">
                                        Message and Data rates may apply.
                                </p>
                                </span>
                            </Form>
                        </Formik>
                        <button className="cart-remove-item-btn form-hlp-btn">
                            Need help ?
                                </button>
                    </div>
                    <div className="create-accnt-div">
                        <span>Have account ?</span>
                    </div>
                    <Link to='/login' className="create-accnt-link">
                        <button className="create-accnt-btn">
                            Login
                </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
