import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/utils/htppRequest';

function ResetPassword() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);
        httpRequest
            .post(`/reset-psw?token=${data.token}&psw=${data.password}`, {})
            .then((response) => {
                alert('Đặt lại mật khẩu thành công');
                navigate('/');
            })
            .catch((error) => {
                alert('Token không hợp lệ');
            })
            .finally(() => {
                setIsSendingEmail(false);
            });
    };

    return (
        <div className="background-section">
            <div className="Auth-form-container container">
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                            <h3 className="Auth-form-title">Đặt lại mật khẩu</h3>
                            <div className="form-group mt-3">
                                <input
                                    className="form-control mt-1"
                                    placeholder="Token xác thực"
                                    {...register('token', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.token && <p>{errors.token.message}</p>}
                            </div>
                            <div className="form-group mt-3">
                                <input
                                    className="form-control mt-1"
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    {...register('password', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <input
                                className="form-control mt-3"
                                placeholder="Xác nhận mật khẩu mới"
                                type="password"
                                {...register('confirmNewPassword', {
                                    required: 'Vui lòng xác nhận mật khẩu mới!',
                                    validate: (value) => value === watch('password') || 'Mật khẩu không trùng nhau!',
                                })}
                            />
                            {errors.confirmNewPassword && <p>{errors.confirmNewPassword.message}</p>}
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Đặt lại mật khẩu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
