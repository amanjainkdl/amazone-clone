import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import firebase from '../util/firebase'

function TwoStepVerification({ isCaptchaAvailable, userSignUpData, handleRedirectToLogin, handleUserName }) {

    let initialValues = {
        otp: ''
    }

    let validate = (values) => {
        let errors = {}
        if (!values.otp) {
            errors.otp = 'Enter otp which you recieved on given mobile number.';
        }
        return errors;
    }

    let onSubmit = (values) => {
        let code = values.otp;
        window.authObj.confirm(code).then(result => {
            console.log('Number verified !!')
            firebase.auth().createUserWithEmailAndPassword(userSignUpData.email, userSignUpData.password)
                .then(() => {
                    var user = firebase.auth().currentUser;
                    console.log(userSignUpData.mobile.number);
                    user.updateProfile({
                        'phoneNumber': +918696181616,
                        'displayName': userSignUpData.name
                    }).then(function () {
                        console.log('Updated successfully');
                        handleRedirectToLogin(true);
                        handleUserName(userSignUpData.name);
                    }, function (error) {
                        console.log(error);
                    });
                })            
        })
    }

    return (
        <div>
            <div className="login-nav">
                <img className="login-nav-img" src={`../img/amazonlogo.png`} />
            </div>
            <div className="login-main-container">
                <div className="login-form-container">
                    {isCaptchaAvailable ? null :
                        <>
                            <p className="form-heading">Are you respiring ?</p>
                            <p className="mt-15">Let us know by verifing captcha..</p>
                            <div className="mt-15" id="recaptcha"></div>
                        </>
                    }
                    {
                        isCaptchaAvailable ?
                            <div id="otp-box" className="mt-15">
                                <h4>Two step verification</h4>
                                <p className="f-13 mt-10">For added security, please enter the One </p>
                                <p className="f-13">Time Password (OTP) that has been sent</p>
                                <p className="f-13">to a phone number ending in 616</p>
                                <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                                    <Form className="form mt-15">
                                        <label htmlFor='otp'>Enter your otp</label>
                                        <Field id="otp" name="otp" className="login-form-input mt-4" />
                                        <div className="error">
                                            <ErrorMessage name="otp" />
                                        </div>
                                        <button type="submit" className="login-form-input login-form-btn">Verify</button>
                                    </Form>
                                </Formik>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default TwoStepVerification
