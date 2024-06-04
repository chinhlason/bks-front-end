import { useNavigate } from 'react-router-dom';
import './roomController.scss';

function RoomController() {
    const navigate = useNavigate();
    return (
        <div className="container py-5">
            <h1> Thông tin các phòng thuộc sự quản lý của bác sĩ </h1>

            <div className="row mt-4">
                <div className="col-md-4">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/pending-record');
                        }}
                    >
                        Số lượng bệnh nhân chưa được xử lý: 20
                    </div>
                </div>
                <div className="col-md-4">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/storage-only-c');
                        }}
                    >
                        Số lượng thiết bị trong kho : 10
                    </div>
                </div>

                <div className="col-md-4">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/bed-storage-only-c');
                            sessionStorage.setItem('prev-page', '/room-controller');
                        }}
                    >
                        Số giường bệnh chưa sử dụng : 10
                    </div>
                </div>
                <div className="col-md-4 mt-5">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/add-patient');
                        }}
                    >
                        Thêm bệnh nhân
                    </div>
                </div>
                <div className="col-md-4 mt-5">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/add-device');
                        }}
                    >
                        Thêm thiết bị
                    </div>
                </div>
                <div className="col-md-4 mt-5">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/add-bed');
                        }}
                    >
                        Thêm giường bệnh
                    </div>
                </div>

                <div className="col-md-4 mt-5">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/patient-controller');
                        }}
                    >
                        Xem toàn bộ danh sách bệnh nhân{' '}
                    </div>
                </div>
                <div className="col-md-4 mt-5">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/device-in-use');
                        }}
                    >
                        Xem toàn bộ thiết bị đang sử dụng{' '}
                    </div>
                </div>
                <div className="col-md-4 mt-5">
                    <div
                        className="room-item-wrapper"
                        onClick={() => {
                            navigate('/bed-in-use');
                        }}
                    >
                        Xem toàn bộ giường bệnh đang sử dụng{' '}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomController;
