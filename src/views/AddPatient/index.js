import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';
import './AddPatient.scss';

const LOGIN_URL = '/record/create';
const doctorCode = localStorage.getItem('DoctorCode');
function AddPatient() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const requestData = {
                DoctorCode: doctorCode,
                Fullname: data.fullname,
                Ccid: data.ccid,
                Address: data.address,
                Dob: data.dob,
                Gender: data.gender,
                Phone: data.phone,
                RelativeName: data.relativeName,
                RelativePhone: data.relativePhone,
                Reason: data.reason,
            };

            const response = await httpRequest.post(LOGIN_URL, requestData);

            navigate('/pending-record'); // Điều hướng trở lại trang trước đó
        } catch (error) {
            console.error('Login failed:', error);
            alert(error);
        }
    };

    return (
        <div className="App py-5">
            <div className="container">
                <h1>Thêm thông tin bệnh nhân</h1>
                <form className="form-box mt-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4">Họ tên bệnh nhân</div>
                        <div className="col-md-8">
                            <input
                                className="form-control mt-1"
                                {...register('fullname', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                            {errors.fullname && <p className="error-message">{errors.fullname.message}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Số căn cước công dân</div>
                        <div className="col-md-8">
                            <input
                                className="form-control mt-1"
                                {...register('ccid', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                            {errors.ccid && <p className="error-message">{errors.ccid.message}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">Giới tính</div>
                        <div className="col-md-8">
                            <select
                                className="form-control mt-1"
                                {...register('gender', {
                                    required: 'Please select a gender',
                                })}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                            </select>
                            {errors.gender && <p className="error-message">{errors.gender.message}</p>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">Ngày sinh</div>
                        <div className="col-md-8">
                            <input
                                type="date"
                                className="form-control mt-1"
                                {...register('dob', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                            {errors.dob && <p className="error-message">{errors.dob.message}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Địa chỉ thường trú</div>
                        <div className="col-md-8">
                            <input
                                className="form-control mt-1"
                                {...register('address', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                            {errors.address && <p className="error-message">{errors.address.message}</p>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">Số điện thoại bệnh nhân</div>
                        <div className="col-md-8">
                            <input
                                className="form-control mt-1"
                                {...register('phone', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="row">
                            <div className="col-md-4">Họ tên người thân</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('relativeName', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                                {errors.relativeName && <p className="error-message">{errors.relativeName.message}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Số điện thoại người thân</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('relativePhone', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                                {errors.relativePhone && (
                                    <p className="error-message">{errors.relativePhone.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <div className="row">
                            <div className="col-md-4">Mô tả thêm</div>
                            <div className="col-md-8">
                                <textarea
                                    className="form-control mt-1 note-detail"
                                    {...register('reason', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                                {errors.reason && <p className="error-message">{errors.reason.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Thêm bệnh nhân
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPatient;
