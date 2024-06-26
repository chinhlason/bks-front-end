import React, { useState, useEffect } from 'react';
import './Home.scss';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';

function Home() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        httpRequest
            .get('/room/get-all')
            .then((response) => {
                if (response.data == null || response.data.length === 0) {
                    console.log('No data received');
                    return;
                }
                setRooms(response.data);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    }, []);

    const handleRoomDetail = (roomName) => {
        navigate(`/room?name=${roomName}`);
    };

    return (
        <div className="container">
            <div className="row py-5">
                <h1> Danh sách phòng bệnh ({rooms.length}) </h1>

                <div className="row">
                    {rooms.map((room) => (
                        <div className="col-xl-4 col-12 col-sm-6 mt-4 " key={room.id}>
                            <div className="card ">
                                <h1 className="ml-2">{room.name}</h1>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Bác sĩ phụ trách : {room.Doctor?.doctor_code} - {room.Doctor?.fullname}
                                    </h5>

                                    <h5 className="card-title">Số lượng bệnh nhân : {room.patient_number}</h5>
                                    <p className="card-text">Số lượng giường bệnh : {room.bed_number}</p>
                                    <button
                                        onClick={() => {
                                            handleRoomDetail(room.name);
                                        }}
                                        className="btn btn-primary"
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
