import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Profile.scss';
import Avatar from '~/assets/img/avatar.png';
import httpRequest from '~/util/httpRequest';
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const {
        register: registerPassword,
        handleSubmit: handleSubmitPassword,
        watch,
        formState: { errors: errorsPassword },
    } = useForm();

    const fetchData = () => {
        httpRequest
            .get('/user/profile')
            .then((response) => {
                setProfileData(response.data);
                setValue('fullname', response.data.fullname);
                setValue('email', response.data.email);
                setValue('phone', response.data.phone);
            })
            .catch((error) => {
                console.error('Error fetching profile data:', error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navigate = useNavigate();

    const onSubmitProfileUpdate = (data) => {
        const req = {
            Fullname: data.fullname,
            Email: data.email,
            Phone: data.phone,
        };
        httpRequest
            .put('/user/update', req)
            .then((response) => {
                alert('Cập nhật thông tin thành công');
                setProfileData(response.data);
                setIsEditing(false);
                localStorage.setItem('Fullname', data.fullname);
                fetchData();
            })
            .catch((error) => {
                alert('Email đã được sử dụng', error);
            });
    };

    const onSubmitPasswordChange = (data) => {
        console.log('Submitting password change', data); // Debug: Log the form data
        const req = {
            OldPassword: data.oldPassword,
            NewPassword: data.newPassword,
        };
        httpRequest
            .put('/user/change-password', req)
            .then((response) => {
                alert('Đổi mật khẩu thành công');
                document.cookie = 'jwt' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'refresh-token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                navigate('/');
            })
            .catch((error) => {
                alert('Error changing password:', error);
            });
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-md-6 box">
                    <h2 className="ppx-font-bold ppx-text-4xl ppx-capitalize mb-0 text-center">Thông tin cá nhân</h2>
                    <div className="px-5 py-4">
                        <div className="form-box-profile">
                            <div className="row mb-2 align-center">
                                <div className="col avatar-box">
                                    <img className="avatar" src={Avatar} alt="Avatar" />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmitProfileUpdate)}>
                                <div className="row mb-2 align-center">
                                    <div className="col">Username</div>
                                    <div className="col">{profileData.doctor_code}</div>
                                </div>
                                <div className="row mb-2 align-center">
                                    <div className="col">Fullname</div>
                                    <div className="col">
                                        {isEditing ? (
                                            <input
                                                className="form-control form-prf mt-1"
                                                defaultValue={profileData.fullname}
                                                {...register('fullname', {
                                                    required: 'Please enter your fullname',
                                                })}
                                            />
                                        ) : (
                                            profileData.fullname
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-2 align-center">
                                    <div className="col">Email</div>
                                    <div className="col">
                                        {isEditing ? (
                                            <input
                                                className="form-control form-prf mt-1"
                                                defaultValue={profileData.email}
                                                {...register('email', {
                                                    required: 'Please enter your email',
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                                        message: 'Invalid email address',
                                                    },
                                                })}
                                            />
                                        ) : (
                                            profileData.email
                                        )}
                                    </div>
                                </div>
                                <div className="row mb-2 align-center">
                                    <div className="col">Phone</div>
                                    <div className="col">
                                        {isEditing ? (
                                            <input
                                                className="form-control form-prf mt-1"
                                                defaultValue={profileData.phone}
                                                {...register('phone', {
                                                    required: 'Please enter your phone number',
                                                })}
                                            />
                                        ) : (
                                            profileData.phone
                                        )}
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="button-prf mb-3">
                                        <button type="submit" className="btn btn-edit-prf btn-primary">
                                            Lưu
                                        </button>
                                    </div>
                                )}
                            </form>

                            <div className="button-prf">
                                <MDBBtn
                                    type="button"
                                    className="btn-edit-prf "
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? 'Hủy' : 'Chỉnh sửa thông tin'}
                                </MDBBtn>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 box">
                    <h2 className="ppx-font-bold ppx-text-4xl ppx-capitalize mb-0 text-center">Đổi mật khẩu</h2>
                    <div className="px-5 py-4">
                        <form className="form-box-profile" onSubmit={handleSubmitPassword(onSubmitPasswordChange)}>
                            <div className="form-group">
                                <label>Mật khẩu hiện tại</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Mật khẩu hiện tại"
                                    type="password"
                                    {...registerPassword('oldPassword', {
                                        required: 'Vui lòng nhập mật khẩu hiện tại!',
                                    })}
                                />
                                {errorsPassword.oldPassword && <p>{errorsPassword.oldPassword.message}</p>}
                            </div>

                            <div className="form-group mt-3">
                                <label>Mật khẩu mới</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Mật khẩu mới"
                                    type="password"
                                    {...registerPassword('newPassword', {
                                        required: 'Vui lòng nhập mật khẩu mới!',
                                    })}
                                />
                                {errorsPassword.newPassword && <p>{errorsPassword.newPassword.message}</p>}
                            </div>

                            <div className="form-group mt-3">
                                <label>Xác nhận mật khẩu mới</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Xác nhận mật khẩu mới"
                                    type="password"
                                    {...registerPassword('confirmNewPassword', {
                                        required: 'Vui lòng xác nhận mật khẩu mới!',
                                        validate: (value) =>
                                            value === watch('newPassword') || 'Passwords do not match!',
                                    })}
                                />
                                {errorsPassword.confirmNewPassword && (
                                    <p>{errorsPassword.confirmNewPassword.message}</p>
                                )}
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Đổi mật khẩu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
