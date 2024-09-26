import './PatientDetail.scss';
import * as React from 'react';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useRef, useState } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';
import { useForm, Controller } from 'react-hook-form';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';
import NoteBox from '~/component/NoteBox';
import { faL } from '@fortawesome/free-solid-svg-icons';
import Sound from '~/assets/video/flash-flood-warning-phoenix-76607.mp3';
function PatientDetail() {
    const chartRef = useRef(null);
    Chart.register(zoomPlugin);
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const idRecord = queryParameters.get('id');
    const URL = `/record/get?id=${idRecord}`;
    const URL_NOTE = `/note/create`;

    const [patientDetail, setPatientDetail] = useState({});
    const [doctorDetail, setDoctorDetail] = useState({});
    const [updaterDetail, setUpdaterDetail] = useState({});
    const [noteDetail, setNoteDetail] = useState([]);
    const [bedDetail, setBedDetail] = useState([]);
    const [deviceDetail, setDeviceDetail] = useState([]);
    const [isWarning, setIsWarning] = useState(false);
    const [continueWarning, setContinueWarning] = useState(true);
    const [sampleTime, setSampleTime] = useState(15);
    const [historyDetail, setHistoryDetail] = useState([]);
    const [currBedDetail, setCurrBedDetail] = useState({});
    const [currDeviceDetail, setCurrDeviceDetail] = useState({});
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);
    const continueWarningRef = useRef(continueWarning);
    const [status, setStatus] = useState('');
    const [time, setTime] = useState('');
    const audioRef = useRef(null);
    const unsubscribeRef = useRef(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { register: newSample, handleSubmit: handleControl } = useForm();
    const {
        register: registerDevice,
        handleSubmit: handleSubmitDevice,
        formState: { errors: errorsDevice },
    } = useForm();
    const fetchData = () => {
        httpRequest
            .get(URL)
            .then((response) => {
                const data = response.data;
                setPatientDetail(data.Patient);
                setStatus(data.Status);
                setTime(data.CreateAt);
                const sortedHistoryBed = data.Beds.sort((a, b) => new Date(b.InuseAt) - new Date(a.InuseAt));
                setBedDetail(sortedHistoryBed);

                if (data.Devices != null) {
                    const sortedHistoryDevice = data.Devices.sort((a, b) => new Date(b.InuseAt) - new Date(a.InuseAt));
                    setDeviceDetail(sortedHistoryDevice);
                }

                setCurrBedDetail(data.CurrBed);
                setCurrDeviceDetail(data.CurrDevice);

                setDoctorDetail(data.Doctor || {});
                setUpdaterDetail(data.Updater);

                const sortedHistory = data.History.sort((a, b) => new Date(b.CreateAt) - new Date(a.CreateAt));
                setHistoryDetail(sortedHistory);

                if (data.Notes != null) {
                    const sortedNote = data.Notes.sort((a, b) => new Date(b.update_at) - new Date(a.update_at));
                    setNoteDetail(sortedNote);
                }
                setNoteDetail(data.Notes);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    };

    useEffect(() => {
        // Kiểm tra nếu giá trị alertMark chưa được thiết lập trong local storage
        if (!localStorage.getItem(idRecord)) {
            localStorage.setItem(idRecord, '1000');
        }
    }, []);

    useEffect(() => {
        fetchData();
        const key = idRecord + 'sample';
        const sample = localStorage.getItem(key);
        if (sample) {
            setSampleTime(sample);
        } else {
            setSampleTime(15);
        }
    }, []);

    useEffect(() => {
        if (deviceDetail[0]) {
            const notInUseAt =
                deviceDetail[0]?.NotInuseAt === '0001-01-01T00:00:00Z'
                    ? new Date().getTime() + 1000000
                    : new Date(deviceDetail[0]?.NotInuseAt).getTime();
            ConfigFirebase(deviceDetail[0]?.Device.serial, new Date(deviceDetail[0]?.InuseAt).getTime(), notInUseAt);
        }

        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, [deviceDetail[0]]);

    const handleSelectChange = (e) => {
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
        }

        const selectedOption = e.target.options[e.target.selectedIndex];
        const newSerial = selectedOption.value;
        const inUseAt = new Date(selectedOption.getAttribute('data-inuseat')).getTime();
        const notInUseAt =
            selectedOption.getAttribute('data-notinuseat') === '0001-01-01T00:00:00Z'
                ? new Date().getTime() + 1000000
                : new Date(selectedOption.getAttribute('data-notinuseat')).getTime();
        unsubscribeRef.current = ConfigFirebase(newSerial, inUseAt, notInUseAt);
    };

    const firebaseConfig = {
        apiKey: 'AIzaSyBkml6LOe9i1XCPHuEZD1HnKtOLVbPzYbo',
        authDomain: 'ibmelab-firebase.firebaseapp.com',
        databaseURL: 'https://ibmelab-firebase-default-rtdb.asia-southeast1.firebasedatabase.app',
        projectId: 'ibmelab-firebase',
        storageBucket: 'ibmelab-firebase.appspot.com',
        messagingSenderId: '476643915776',
        appId: '1:476643915776:web:a29161d17f36a1bd9580e5',
        measurementId: 'G-4ZVSTZYJN0',
    };

    let firebaseApp;

    if (!firebaseApp) {
        firebaseApp = initializeApp(firebaseConfig);
    }

    const database = getDatabase(firebaseApp);

    function ConfigFirebase(serial, inUseAt, notInUseAt) {
        const alertMarkCheck = parseFloat(localStorage.getItem(idRecord) || '2000');
        const dataRef = ref(database, `ibme/device/data/${serial}`);

        const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            const entries = Object.entries(data);
            const latestEntry = entries[entries.length - 1][1];

            if (latestEntry.volume >= alertMarkCheck && continueWarningRef.current === true) {
                setIsWarning(true);
            } else {
                setIsWarning(false);
            }

            const filteredData = entries
                .filter(([key, value]) => {
                    const timestamp = new Date(value.timestamp).getTime();
                    return timestamp >= inUseAt && timestamp <= notInUseAt;
                })
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});

            console.log('filteredData', filteredData);

            const volumes = Object.values(filteredData).map((item) => item.volume);
            const timestamps = Object.values(filteredData).map((item) => new Date(item.timestamp));

            // Draw chart
            drawChart(volumes, timestamps);
        });
        return unsubscribe;
    }

    const handleStop = () => {
        setIsWarning(false);
        setContinueWarning(false);
        setTimeout(() => {
            setContinueWarning(true);
        }, 30000); // 5 minutes in milliseconds
    };

    const handleOffAlert = () => {
        setIsWarning(false);
        setContinueWarning(false);
    };

    useEffect(() => {
        if (isWarning && audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.log('Play audio failed:', error);
            });
        }
    }, [isWarning]);

    useEffect(() => {
        continueWarningRef.current = continueWarning;
    }, [continueWarning]);

    const drawChart = (volumes, timestamps) => {
        if (chartRef.current) {
            try {
                const localTimestamps = timestamps.map((ts) => moment(ts).format('YYYY-MM-DD HH:mm:ss'));
                const config = {
                    type: 'line',
                    data: {
                        labels: localTimestamps,
                        datasets: [
                            {
                                label: 'Khối lượng',
                                data: volumes,
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                title: {
                                    display: true,
                                    text: 'Dung tích dịch thải (ml)',
                                },
                                beginAtZero: true,
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Thời gian',
                                },
                            },
                        },
                        plugins: {
                            zoom: {
                                pan: {
                                    enabled: true,
                                    mode: 'x',
                                },
                                zoom: {
                                    wheel: {
                                        enabled: true,
                                    },
                                    pinch: {
                                        enabled: true,
                                    },
                                    mode: 'x',
                                },
                            },
                        },
                    },
                };

                let chartStatus = Chart.getChart('chart');
                if (chartStatus != undefined) {
                    chartStatus.destroy();
                }
                const mychart = new Chart(chartRef.current, config);
            } catch (error) {
                console.error('d', error);
            }
        }
    };

    const handleRemoveDeviceClick = () => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn gỡ thiết bị ${currDeviceDetail.serial} này không?`);
        if (userConfirmed) {
            httpRequest
                .put(`/device/unuse-device?serial=${currDeviceDetail.serial}`, {})
                .then((response) => {
                    fetchData(); // Re-fetch data to update the component
                })
                .catch((error) => {
                    console.error('Error removing device:', error);
                });
        }
    };

    const handleOnOffDeviceClick = (serial) => {
        setIsUpdateVisible(true);
    };

    const handleRemoveBedClick = () => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn huỷ giường ${currBedDetail.name} này không?`);
        if (userConfirmed) {
            httpRequest
                .put(`/bed/unusage-bed?bed=${currBedDetail.name}&room=${currBedDetail.Room.name}&id=${idRecord}`, {})
                .then((response) => {
                    fetchData(); // Re-fetch data to update the component
                })
                .catch((error) => {
                    console.error('Error removing device:', error);
                });
        }
    };

    const handleNoteDelete = () => {
        fetchData();
    };
    const handleLeaveClick = () => {
        const userConfirmed = window.confirm(`Xác nhận xuất viện?`);
        if (userConfirmed) {
            httpRequest
                .put(`/record/leave?id=${idRecord}`, {})
                .then((response) => {
                    fetchData(); // Re-fetch data to update the component
                })
                .catch((error) => {
                    alert('Cần huỷ giường và thiết bị trước');
                });
        }
    };

    const onSubmit = (data) => {
        const noteData = {
            Content: data.comment,
            ImgUrl: 'oldurl',
            IdRecord: idRecord,
        };

        httpRequest
            .post(URL_NOTE, noteData)
            .then((response) => {
                fetchData();
                reset();
            })
            .catch((error) => {
                console.error('Error creating note:', error);
            });
    };

    const onSubmitControl = (data) => {
        httpRequest
            .post(`/device/change-sample?device=${currDeviceDetail.serial}&time=${data.newSampleDevice}`, {})
            .then((response) => {
                alert('Cập nhật thành công');
                fetchData();
                const key = idRecord + 'sample';
                localStorage.setItem(key, data.newSampleDevice);
                setSampleTime(data.newSampleDevice);
                setIsUpdateVisible(false);
            })
            .catch((error) => {
                console.error('Error creating note:', error);
            });
    };

    const onUpdateAlert = (data) => {
        localStorage.setItem(idRecord, data.newSample);
    };

    const handleOn = () => {
        httpRequest
            .post(`/device/on-off?device=${currDeviceDetail.serial}&control=on`, {})
            .then((response) => {
                alert('Bật thiết bị thành công');
                fetchData();
                setIsUpdateVisible(false);
            })
            .catch((error) => {
                console.error('Error creating note:', error);
            });
    };

    const handleOff = () => {
        httpRequest
            .post(`/device/on-off?device=${currDeviceDetail.serial}&control=off`, {})
            .then((response) => {
                alert('Tắt thiết bị thành công');
                fetchData();
                setIsUpdateVisible(false);
            })
            .catch((error) => {
                console.error('Error creating note:', error);
            });
    };

    return (
        <div className="App py-5">
            <div className="container">
                {isWarning && (
                    <div>
                        <div
                            className="update-overlay-red"
                            onClick={() => {
                                handleStop();
                            }}
                        ></div>
                        <div className="update-modal-warn">
                            <div className="container update-wrapper">
                                <h1>Cảnh báo vượt ngưỡng !!!!</h1>
                                <audio ref={audioRef} src={Sound} />
                                <div className="onoff-wrap">
                                    <MDBBtn
                                        onClick={() => {
                                            handleStop();
                                        }}
                                        className="btn-onoff"
                                    >
                                        Tắt tạm thời
                                    </MDBBtn>
                                    <MDBBtn
                                        onClick={() => {
                                            handleOffAlert();
                                        }}
                                        className="btn-onoff"
                                    >
                                        Tắt thông báo cho đến khi bật lại
                                    </MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
                                <h2>Cập nhật thông tin thiết bị</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div>*5 phút = 300 giây</div>
                                        <div>*10 phút = 600 giây</div>
                                        <div>*15 phút = 900 giây</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div>*20 phút = 1200 giây</div>
                                        <div>*30 phút = 1800 giây</div>
                                        <div>*1 giờ = 3600 giây</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <form className="form-box col-md-6" onSubmit={handleSubmitDevice(onSubmitControl)}>
                                        <div className="form-group mt-3">
                                            <label>Thời gian gửi dữ liệu (giây)</label>
                                            <input
                                                className="form-control mt-1"
                                                placeholder="Thời gian gửi dữ liệu (giây)"
                                                {...registerDevice('newSampleDevice', {
                                                    required: 'Thời gian gửi dữ liệu là bắt buộc',
                                                })}
                                            />
                                            {errorsDevice.newSampleDevice && (
                                                <span>{errorsDevice.newSampleDevice.message}</span>
                                            )}
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <MDBBtn className="update-button" type="submit">
                                                Cập nhật thời gian
                                            </MDBBtn>
                                        </div>
                                    </form>

                                    <form className="form-box col-md-6" onSubmit={handleControl(onUpdateAlert)}>
                                        <div className="form-group mt-3">
                                            <label>Chỉnh mốc dữ liệu cảnh báo</label>
                                            <input
                                                className="form-control mt-1"
                                                placeholder="Chỉnh mốc dữ liệu cảnh báo"
                                                type="number"
                                                {...newSample('newSample')}
                                            />
                                            {errors.newSample && <span>{errors.newSample.message}</span>}
                                        </div>
                                        <div className="d-grid gap-2 mt-3">
                                            <MDBBtn className="update-button">Cập nhật mốc</MDBBtn>
                                        </div>
                                    </form>
                                </div>

                                <div className="onoff-wrap">
                                    <MDBBtn
                                        onClick={() => {
                                            handleOn();
                                        }}
                                        className="btn-onoff"
                                    >
                                        Bật thiết bị
                                    </MDBBtn>
                                    <MDBBtn
                                        onClick={() => {
                                            handleOff();
                                        }}
                                        className="btn-onoff"
                                    >
                                        Tắt thiết bị
                                    </MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <h1>
                    {' '}
                    Thông tin bệnh nhân (Giường {currBedDetail?.name} - Phòng {currBedDetail.Room?.name}){' '}
                </h1>
                <div className="row">
                    <div className="col-md-8"></div>

                    <div className="option-rc col-md-4">
                        <h3
                            className={`device-option-button  ${
                                (Object.keys(currDeviceDetail).length !== 0 &&
                                    currDeviceDetail.id !== `00000000-0000-0000-0000-000000000000`) ||
                                status == 'LEAVED'
                                    ? 'disabled'
                                    : ''
                            }`}
                        >
                            {Object.keys(currBedDetail).length !== 0 &&
                            currBedDetail.id !== `00000000-0000-0000-0000-000000000000` ? (
                                <div onClick={handleRemoveBedClick}>Huỷ giường</div>
                            ) : (
                                <div
                                    onClick={() => {
                                        navigate(`/bed-storage?patient=${patientDetail.patient_code}&id=${idRecord}`);
                                    }}
                                >
                                    Thêm giường
                                </div>
                            )}
                        </h3>

                        <h3
                            className={`device-option-button ${status == 'LEAVED' ? 'disabled' : ''}`}
                            onClick={handleLeaveClick}
                        >
                            Xuất viện
                        </h3>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-6">
                        <h4 className="bold-text">Trạng thái : {status}</h4>
                        <h4>Mã bệnh nhân : {patientDetail.patient_code}</h4>
                        <h4>Họ tên : {patientDetail.fullname}</h4>
                        <h4>Giới tính : {patientDetail.gender}</h4>
                        <h4>Ngày sinh : {patientDetail.dob}</h4>
                        <h4>Thông tin liên lạc : {patientDetail.phone}</h4>
                        <h4>Căn cước công dân : {patientDetail.ccid}</h4>
                        <h4>Địa chỉ : {patientDetail.address}</h4>
                        <h4>Ngày nhập viện : {new Date(time).toLocaleDateString('vi-VN')}</h4>
                    </div>
                    <div className="col-md-6">
                        <h4 className="bold-text">
                            Thiết bị hiện tại : {currDeviceDetail.serial || 'Chưa có thông tin'}
                        </h4>
                        <h4>Thông tin người thân : {patientDetail.relative_name}</h4>
                        <h4>Số liên lạc người thân : {patientDetail.relative_phone}</h4>

                        <h4>Bác sĩ phụ trách : {doctorDetail.fullname || 'N/A'}</h4>
                        <h4>Mã bác sĩ phụ trách : {doctorDetail.doctor_code || 'N/A'}</h4>
                        <h4>Số điện thoại : {doctorDetail.phone || 'N/A'}</h4>
                        <h4>Email : {doctorDetail.email || 'N/A'}</h4>
                    </div>
                    <h4>Mô tả : {patientDetail.reason}</h4>
                </div>

                <h3 className="mt-3 option-rc">
                    Biểu đồ dịch thải
                    {deviceDetail.length > 0 ? (
                        <select className="select-history" onChange={handleSelectChange}>
                            {deviceDetail.map((device, index) => (
                                <option
                                    key={index}
                                    value={device.Device.serial}
                                    data-inuseat={device.InuseAt}
                                    data-notinuseat={device.NotInuseAt}
                                >
                                    {device.Device.serial}
                                    {' - '}
                                    <span className="time">
                                        {new Date(device.InuseAt).toLocaleString('vi-VN')} -{' '}
                                        {device.NotInuseAt === '0001-01-01T00:00:00Z'
                                            ? 'hiện tại'
                                            : new Date(device.NotInuseAt).toLocaleString('vi-VN')}
                                    </span>
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p>N/A</p>
                    )}
                    <div
                        className={`device-option-button ${
                            Object.keys(currBedDetail).length === 0 ||
                            currBedDetail.id === `00000000-0000-0000-0000-000000000000` ||
                            status == 'LEAVED'
                                ? 'disabled'
                                : ''
                        }`}
                    >
                        {Object.keys(currDeviceDetail).length === 0 ||
                        currDeviceDetail.id === '00000000-0000-0000-0000-000000000000' ? (
                            <button
                                className={`toggle-device `}
                                onClick={() => {
                                    navigate(`/storage?patient=${patientDetail.patient_code}&id=${idRecord}`);
                                }}
                            >
                                Thêm thiết bị
                            </button>
                        ) : (
                            <div className="d-flex">
                                <div className="remove-device" onClick={handleRemoveDeviceClick}>
                                    Gỡ thiết bị
                                </div>
                                <div className="toggle-device ml-3" onClick={handleOnOffDeviceClick}>
                                    Điều khiển thiết bị
                                </div>
                            </div>
                        )}
                    </div>
                </h3>

                <MDBBtn
                    onClick={() => {
                        setContinueWarning(true);
                    }}
                >
                    Bật cảnh báo
                </MDBBtn>
                {currDeviceDetail.id != `00000000-0000-0000-0000-000000000000` ? (
                    <div>
                        <canvas id="chart" ref={chartRef}></canvas>
                        <h4>
                            Thời gian gửi dữ liệu lên hệ thống{' '}
                            <span className="bold-text">
                                {sampleTime} (giây) - {sampleTime / 60} (phút)
                            </span>
                        </h4>
                    </div>
                ) : (
                    <div>
                        <canvas id="chart" ref={chartRef}></canvas>
                    </div>
                )}
                <h3 className="mt-3">Ghi chú của bác sĩ</h3>
                <div className="row mt-3">
                    <NoteBox noteDetail={noteDetail} onDelete={handleNoteDelete} status={status} />

                    <div className="col-md-4 note-form">
                        <div className="ml-2">
                            <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group ">
                                    <textarea
                                        className="form-note-control form-comment-control"
                                        placeholder="Thêm ghi chú"
                                        {...register('comment', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                </div>
                                {errors.comment && <span className="text-danger">{errors.comment.message}</span>}
                                <div className="d-grid gap-2 mt-3">
                                    <button className={`btn btn-primary ${status == 'LEAVED' ? 'disabled' : ''}`}>
                                        Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <h3 className="mt-5">Lịch sử thiết bị</h3>
                <div className="note-element">
                    {deviceDetail && deviceDetail.length > 0 ? (
                        deviceDetail.map((device, index) => (
                            <div className="history-element" key={index}>
                                <li>Serial {device.Device.serial}</li>
                                <p className="time">
                                    Sử dụng từ {new Date(device.InuseAt).toLocaleString('vi-VN')} -{' '}
                                    {device.NotInuseAt === '0001-01-01T00:00:00Z'
                                        ? 'hiện tại'
                                        : new Date(device.NotInuseAt).toLocaleString('vi-VN')}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có thiết bị</p>
                    )}
                </div>
                <h3 className="mt-5">Lịch sử giường bệnh</h3>
                <div className="note-element">
                    {bedDetail.map((bed, index) => (
                        <div className="history-element" key={index}>
                            <li>
                                {bed.name} - {bed.Room?.name}
                            </li>
                            <p className="time">
                                Sử dụng từ {new Date(bed.InuseAt).toLocaleString('vi-VN')} -{' '}
                                {bed.NotInuseAt === '0001-01-01T00:00:00Z'
                                    ? 'hiện tại'
                                    : new Date(bed.NotInuseAt).toLocaleString('vi-VN')}
                            </p>
                        </div>
                    ))}
                </div>
                <h3 className="mt-5">Lịch sử bệnh án</h3>
                <div className="note-element">
                    {historyDetail.map((history, index) => (
                        <div className="history-element" key={index}>
                            <li>{history.Content}</li>
                            <p className="time">
                                {new Date(history.CreateAt).toLocaleString('vi-VN')} - {history.Doctor?.fullname}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PatientDetail;
