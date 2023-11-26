import React from 'react';
import './Login.scss';
import { useForm, Controller } from 'react-hook-form';
import httpRequest from '~/utils/htppRequest';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Alert } from 'bootstrap';
const LOGIN_URL = '/user/auth/signin';

function Login() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const isLogined = localStorage.getItem('isLogined');

    useEffect(() => {
        if (isLogined !== null) {
            navigate('/');
        }
    }, []);

    const onSubmit = (data) => {
        const username = data.username;
        const password = data.password;
        httpRequest
            .post(
                LOGIN_URL,
                {
                    username,
                    password,
                },
                { withCredentials: true },
            )
            .then((response) => {
                localStorage.setItem('id', `${response.data.id}`);
                localStorage.setItem('username', `${response.data.username}`);
                localStorage.setItem('fullname', `${response.data.fullname}`);
                localStorage.setItem('phone', `${response.data.phone}`);
                localStorage.setItem('email', `${response.data.email}`);
                localStorage.setItem('role', `${response.data.roles[0]}`);
                localStorage.setItem('isLogined', `true`);
                navigate('/');
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    return (
        <div className="Auth-form-container container">
            <div className="Auth-form">
                <div className="Auth-form-content">
                    <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
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
            </div>
        </div>
    );
}

export default Login;
