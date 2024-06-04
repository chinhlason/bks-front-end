import React from 'react';
import './Login.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/utils/htppRequest';

const LOGIN_URL = 'http://localhost:8081/login';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const { username, password } = data; // Lấy thông tin tài khoản và mật khẩu từ form
            const requestData = { DoctorCode: username, Password: password }; // Định dạng dữ liệu gửi đi

            httpRequest
                .post(LOGIN_URL, requestData, { withCredentials: true }) // Gửi yêu cầu POST với dữ liệu đã được định dạng
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('DoctorCode', requestData.DoctorCode);
                    navigate('/mainpage');
                });
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="background-section">
            <div className="Auth-form-container container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="Auth-form-title">Đăng nhập</h3>
                            <div className="form-group mt-3">
                                <label>Tài khoản</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Username"
                                    {...register('username', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                                {errors.username && <p>{errors.username.message}</p>}
                            </div>
                            <div className="form-group mt-3">
                                <label>Mật khẩu</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Đăng nhập
                                </button>
                            </div>
                        </form>
                        <div className="option-text d-flex mt-3">
                            <p className="text-right">
                                <a href="#">Quên mật khẩu?</a>
                            </p>
                            <p className="text-right">
                                <a href="/register">Đăng ký!</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
