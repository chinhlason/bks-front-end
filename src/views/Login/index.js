import React from 'react';
import './Login.scss';
import { useForm, Controller } from 'react-hook-form';

function Login() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <form className="form-box">
                        <h3 className="Auth-form-title">Sign In</h3>
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

                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>

                    <div className="option-text d-flex mt-3">
                        <p className="text-right">
                            <a href="#">Forgot password?</a>
                        </p>
                        <p className="text-right">
                            <a href="#">Sign up now!</a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
