import React, { useState } from 'react';
import './Signup.scss';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as emailValidator from 'email-validator';

function SignUp() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const validateEmail = (value) => {
        if (!emailValidator.validate(value)) {
            return 'Vui lòng nhập đúng Email';
        }
        return true;
    };
    const validatePhone = (value) => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
            return 'Vui lòng nhập đúng số điện thoại';
        }
        return true;
    };

    return (
        <div className="background-section">
            <div className="container signup-container ">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <form className="form-box">
                            <h3 className="Auth-form-title">Register</h3>
                            <div className="form-group mt-3">
                                <label>Username</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Username"
                                    {...register('username', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Fullname</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Fullname"
                                    {...register('fullname', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Email"
                                    type="email"
                                    {...register('email', {
                                        validate: validateEmail,
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Phone</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Phone"
                                    type="number"
                                    {...register('phone', {
                                        validate: validatePhone,
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                        <div className="option-text d-flex mt-3">
                            <p className="text-dark ">
                                You already have accound? <a href="#">Login</a> now!
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
