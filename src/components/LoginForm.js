import React, { useState } from 'react'
import '../style/LoginForm.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom';
import { AiFillCaretDown, AiFillCaretRight, AiOutlineWarning } from "react-icons/ai";
import firebase from 'firebase'
import Home from './Home';

function LoginForm({ handleSignInSubmit, handleRedirectToLogin, error, handleRedirectToAuth }) {

    const [isNeedHelpClicked, setisNeedHelpClicked] = useState(false);

    let initialValues = {
        email: '',
        password: ''
    }

    let validate = (values) => {
        let errors = {}
        if (!values.email) {
            errors.email = 'Enter your email or mobile phone number';
        }
        if (!values.password) {
            errors.password = 'Enter your password';
        }
        return errors;
    }

    let onSubmit = (values) => {
        handleSignInSubmit(values);
    }

    let handleNeedHelp = () => {
        setisNeedHelpClicked(prevState => !prevState);
    }

    return (
        <div>
            <div>
                <div className="login-nav">
                    <img className="login-nav-img" src={`../img/amazonlogo.png`} />
                </div>
                {error ? <div className='error-box'>
                    <div className="error-left">
                        <AiOutlineWarning className="danger" />
                    </div>
                    <div className="error-right">
                        <h4 className="error-heading">There was a problem</h4>
                        {error}
                    </div>
                </div> : null
                }
                <div className="login-main-container">
                    <div className="login-form-container">
                        <p className="form-heading">Login</p>
                        <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                            <Form className="form mt-15">
                                <label htmlFor='email'>Email or mobile phone number</label>
                                <Field type="email" id="email" name="email" className="login-form-input mt-4" />
                                <div className="error">
                                    <ErrorMessage name="email" />
                                </div>

                                <label htmlFor='password' className="mt-10">Password</label>
                                <Field type="password" id="password" name="password" className="login-form-input mt-4" />
                                <div className="error">
                                    <ErrorMessage name="password" className="error" />
                                </div>

                                <br />
                                <button type="submit" className="login-form-input login-form-btn">Continue</button>
                                <span>
                                    <p className="f-13 mt-15">
                                        By continuing, you agree to Amazon's Conditions of
                                </p>
                                    <p className="f-13">
                                        Use and Privacy Notice.
                                </p>
                                </span>
                            </Form>
                        </Formik>
                        <button className="cart-remove-item-btn form-hlp-btn" onClick={handleNeedHelp}>
                            {isNeedHelpClicked ? <AiFillCaretDown /> : <AiFillCaretRight />}Need help ?
                        </button>
                        {
                            isNeedHelpClicked ?
                                <div>
                                    <button className="cart-remove-item-btn form-hlp-btn mtl-5-13">Forgot Password ?</button><br />
                                    <button className="cart-remove-item-btn form-hlp-btn mtl-5-13">Other Issues ?</button>
                                </div> : null 
                        }
                    </div>
                    <div className="create-accnt-div">
                        <span>New to Amazon ?</span>
                    </div>
                    <Link to='/signup' className="create-accnt-link">
                        <button className="create-accnt-btn" onClick={() => handleRedirectToAuth(false)}>
                            Create your Amazon account
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
