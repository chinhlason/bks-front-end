import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import httpRequest from '~/util/httpRequest';
import { MDBBtn } from 'mdb-react-ui-kit';
import PNGTest from '~/assets/img/test.png';
function AddDevice() {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);

    const onSubmit = (data) => {
        // Tạo đối tượng request body từ dữ liệu form

        const requestBody = [
            {
                Serial: data.serial,
                Warraty: parseInt(data.warraty),
            },
        ];

        httpRequest
            .post('/device/add', requestBody, { withCredentials: true })
            .then((response) => {
                console.log('Device added:', response.data);
                alert('Thêm thiết bị thành công');
                reset();
            })
            .catch((error) => {
                console.error('Error adding device:', error);
                alert('Trùng thông tin thiết bị');
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
                Warraty: parseInt(item.Warraty), // Chuyển đổi chuỗi sang số nguyên
            }));

            // Xác nhận gửi sau khi chuyển đổi thành công
            const confirmSend = window.confirm('Bạn có chắc chắn muốn gửi dữ liệu đã tải lên không?');
            if (confirmSend) {
                httpRequest
                    .post('/device/add', parsedJson, { withCredentials: true })
                    .then((response) => {
                        console.log('Devices added from file:', response.data);
                        alert('Thêm thiết bị thành công');
                    })
                    .catch((error) => {
                        console.error('Error adding devices from file:', error);
                        alert('Trùng thông tin thiết bị');
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
                <h1>Thêm thông tin thiết bị</h1>
                <div className="row">
                    <form className="form-box mt-3 col-md-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-4">Serial thiết bị</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('serial', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.serial && <span>{errors.serial.message}</span>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">Thời gian bảo hành</div>
                            <div className="col-md-8">
                                <input
                                    className="form-control mt-1"
                                    {...register('warraty', {
                                        required: 'Vui lòng nhập thông tin!',
                                    })}
                                />
                                {errors.warraty && <span>{errors.warraty.message}</span>}
                            </div>
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Thêm thiết bị
                            </button>
                        </div>
                    </form>
                    <button onClick={handleUpdate} className="btn btn-primary col-md-4">
                        Nhập thiết bị theo file
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddDevice;
