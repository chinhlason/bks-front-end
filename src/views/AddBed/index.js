import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PNGTest from '~/assets/img/bed.png';
import * as XLSX from 'xlsx';
import httpRequest from '~/util/httpRequest';

function AddBed() {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);
    const [rooms, setRooms] = useState([]);

    // Fetch room data from the API
    useEffect(() => {
        httpRequest
            .get('/room/get-all')
            .then((response) => {
                setRooms(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    }, []);

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

            console.log(parsedJson);
            // Xác nhận gửi sau khi chuyển đổi thành công
            const confirmSend = window.confirm('Bạn có chắc chắn muốn gửi dữ liệu đã tải lên không?');
            if (confirmSend) {
                httpRequest
                    .post('/bed/insert', parsedJson)
                    .then((response) => {
                        console.log('Devices added from file:', response.data);
                        alert('Thêm giường thành công');
                    })
                    .catch((error) => {
                        console.error('Error adding devices from file:', error);
                        alert('Trùng thông tin giường, không tồn tại phòng hoặc không phải phòng bác sĩ đang quản lý');
                    });
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const onSubmit = (data) => {
        // Tạo đối tượng request body từ dữ liệu form
        const requestBody = [
            {
                Name: data.bed,
                RoomName: data.room,
            },
        ];

        httpRequest
            .post('/bed/insert', requestBody)
            .then((response) => {
                console.log('Device added:', response.data);
                alert('Thêm giường thành công');
                reset();
            })
            .catch((error) => {
                console.error('Error adding device:', error);
                alert('Trùng thông tin giường, không tồn tại phòng hoặc không phải phòng bác sĩ đang quản lý');
            });
    };

    const handleUpdate = (serial) => {
        setIsUpdateVisible(true);
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
                                <img src={PNGTest} className="img-test-2" alt="Hình ảnh" />
                            </div>
                        </div>
                    </div>
                )}
                <h1>Thêm thông tin giường bệnh </h1>
                <div className="row">
                    <div className="row">
                        <form className="form-box mt-3 col-md-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-4">Tên giường</div>
                                <div className="col-md-8">
                                    <input
                                        className="form-control mt-1"
                                        {...register('bed', {
                                            required: 'Vui lòng nhập thông tin!',
                                        })}
                                    />
                                    {errors.bed && <span>{errors.bed.message}</span>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">Tên phòng</div>
                                <div className="col-md-8">
                                    <select
                                        className="form-control mt-1"
                                        {...register('room', {
                                            required: 'Vui lòng chọn phòng!',
                                        })}
                                    >
                                        <option value="">Chọn phòng</option>
                                        {rooms.map((room) => (
                                            <option key={room.id} value={room.name}>
                                                {room.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.room && <span>{errors.room.message}</span>}
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Thêm giường
                                </button>
                            </div>
                        </form>
                        <button onClick={handleUpdate} className="btn btn-primary col-md-4">
                            Nhập giường theo file
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBed;
