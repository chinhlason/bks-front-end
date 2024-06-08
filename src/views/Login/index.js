import React from 'react';
import './Login.scss';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/utils/htppRequest';
const LOGIN_URL = 'http://13.239.21.34:8081/login';

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    // Điều chỉnh đường dẫn tới module httpRequest của bạn

    const LOGIN_URL = '/login'; // Thay thế bằng URL đăng nhập thực tế của bạn

    const onSubmit = async (data) => {
        try {
            const { username, password } = data; // Lấy thông tin tài khoản và mật khẩu từ form
            const requestData = { DoctorCode: username, Password: password }; // Định dạng dữ liệu gửi đi

            const response = await httpRequest.post(LOGIN_URL, requestData); // Gửi yêu cầu POST với dữ liệu đã được định dạng

            // Lưu trữ AccessToken và RefreshToken vào cookie
            const { AccessToken, RefreshToken, User } = response.data;
            Cookies.set('jwt', AccessToken, { expires: 7 }); // RefreshToken có hạn sử dụng 7 ngày
            Cookies.set('refresh-token', RefreshToken, { expires: 7 }); // RefreshToken có hạn sử dụng 7 ngày

            // Lưu trữ thông tin người dùng vào localStorage
            localStorage.setItem('DoctorCode', User.doctor_code);
            localStorage.setItem('Role', User.role);
            localStorage.setItem('Fullname', User.fullname);

            // Điều hướng dựa trên vai trò của người dùng
            if (User.role === 'DOCTOR') {
                navigate('/mainpage');
            } else {
                navigate('/mainpage-admin');
            }
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
                            <p></p>
                            <p className="text-right">
                                <div
                                    onClick={() => {
                                        navigate('/forgot-password');
                                    }}
                                >
                                    Quên mật khẩu?
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
