import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/utils/htppRequest';

function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isSendingEmail, setIsSendingEmail] = useState(false);

    const onSubmit = async (data) => {
        setIsSendingEmail(true);
        console.log(data.email);
        httpRequest
            .post(`/send-mail?email=${data.email}`, {})
            .then((response) => {
                alert('Gửi thành công, hãy check trong email (có thể email sẽ bị gửi vào trong thư rác)');
                navigate('/reset-password');
            })
            .catch((error) => {
                alert('Email không hợp lệ');
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
                            <h3 className="Auth-form-title">Quên mật khẩu</h3>
                            <div className="form-group mt-3">
                                <input
                                    className="form-control mt-1"
                                    placeholder="Nhập email của bạn"
                                    {...register('email', {
                                        required: 'Please enter complete information!',
                                    })}
                                    disabled={isSendingEmail}
                                />
                                {errors.email && <p>{errors.email.message}</p>}
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary" disabled={isSendingEmail}>
                                    {isSendingEmail ? 'Đang gửi...' : 'Gửi email'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
