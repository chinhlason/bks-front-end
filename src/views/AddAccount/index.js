import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import httpRequest from '~/util/httpRequest';
import { MDBBtn } from 'mdb-react-ui-kit';
import PNGTest from '~/assets/img/doctor.png';
function AddAccount() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        httpRequest
            .get('/user/get-all-doctors')
            .then((response) => {
                setDoctors(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    }, []);

    const onSubmit = (data) => {
        // Tạo đối tượng request body từ dữ liệu form

        const requestBody = [
            {
                DoctorCode: data.doctorCode,
                Fullname: data.fullname,
                Password: data.password,
                Email: data.email,
                Phone: data.phone,
            },
        ];
        console.log(data);
        httpRequest
            .post('/register-list', requestBody)
            .then((response) => {
                alert('Thêm tài khoản thành công');
                reset();
            })
            .catch((error) => {
                console.error('Error adding device:', error);
                alert('Trùng thông tin tài khoản');
            });
    };

    const handleUpdate = (serial) => {
        setIsUpdateVisible(true);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { raw: false }); // raw: false để chuyển đổi dữ liệu sang dạng object

            // Chuyển đổi trường Warranty từ chuỗi sang số nguyên
            const parsedJson = json.map((item) => ({
                ...item,
            }));

            // Xác nhận gửi sau khi chuyển đổi thành công
            const confirmSend = window.confirm('Bạn có chắc chắn muốn gửi dữ liệu đã tải lên không?');
            if (confirmSend) {
                httpRequest
                    .post('/register-list', parsedJson)
                    .then((response) => {
                        console.log('Devices added from file:', response.data);
                        alert('Thêm thông tin tài khoản thành công');
                    })
                    .catch((error) => {
                        console.error('Error adding devices from file:', error);
                        alert('Trùng thông tin tài khoản');
                    });
            }
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="App py-5">
            <div className="container">
                {isUpdateVisible && (
                    <div>
                        <div
                            className="update-overlay"
                            onClick={() => {
                                setIsUpdateVisible(false);
                            }}
                        ></div>
                        <div className="update-modal">
                            <div className="container update-wrapper">
                                <div className="d-grid gap-2 mt-3">
                                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                                </div>
                                <h6 className="mt-3">Hình ảnh file mẫu xlsx </h6>
                                <img src={PNGTest} className="img-test" alt="Hình ảnh" />
                            </div>
                        </div>
                    </div>
                )}
                <h1>Thêm thông tin tài khoản</h1>
                <div className="row">
                    <form className="form-box mt-3 col-md-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-4">Mã bác sĩ</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('doctorCode', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.doctorCode && <span>{errors.doctorCode.message}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Họ tên bác sĩ</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('fullname', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.fullname && <span>{errors.fullname.message}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Mật khẩu</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    type="password"
                                    {...register('password', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.password && <span>{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Email</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('email', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Số điện thoại</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('phone', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.phone && <span>{errors.phone.message}</span>}
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Thêm tài khoản
                            </button>
                        </div>
                    </form>
                    <button onClick={handleUpdate} className="btn btn-primary col-md-4">
                        Tạo tài khoản theo file theo file
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddAccount;
