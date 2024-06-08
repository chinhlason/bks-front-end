import './Sidebar.scss';
import Col from 'react-bootstrap/Col';
import Avatar from '~/assets/img/avatar.png';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';

function Sidebar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('Role');
    const fullname = localStorage.getItem('Fullname');

    const handleSignOut = () => {
        httpRequest
            .post(`/log-out`, { withCredentials: true })
            .then((response) => {
                document.cookie = 'jwt' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'refresh-token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                navigate('/');
            })
            .catch((error) => {
                console.error('There was an error updating the note!', error);
            });
    };

    return (
        <div className="side-bar">
            <div
                className="profile-doctor"
                onClick={() => {
                    navigate('/profile');
                }}
            >
                <Col xs="auto profile d-flex">
                    <img className="avatar" src={Avatar} alt="avatar" />
                </Col>
                <p className="profile d-flex">{fullname}</p>
            </div>
            {role === 'HEAD_DOCTOR' ? (
                <>
                    <SidebarItem
                        value="QL Phòng bệnh"
                        onItemClick={() => {
                            navigate('/mainpage-admin');
                        }}
                    />
                    <SidebarItem
                        value="QL Tài khoản"
                        onItemClick={() => {
                            navigate('/account-admin');
                        }}
                    />
                    <SidebarItem
                        value="QL Bệnh nhân"
                        onItemClick={() => {
                            navigate('/patient-controller-admin');
                        }}
                    />
                    <SidebarItem
                        value="QL Thiết bị"
                        onItemClick={() => {
                            navigate('/device-in-use-admin');
                        }}
                    />
                    <SidebarItem
                        value="Kho Thiết bị"
                        onItemClick={() => {
                            navigate('/storage-only-c');
                        }}
                    />
                </>
            ) : (
                <>
                    <SidebarItem
                        value="Trang chủ"
                        onItemClick={() => {
                            navigate('/mainpage');
                        }}
                    />
                    <SidebarItem
                        value="Thông tin cá nhân"
                        onItemClick={() => {
                            navigate('/profile');
                        }}
                    />
                    <SidebarItem
                        value="QL Chung"
                        onItemClick={() => {
                            navigate('/room-controller');
                        }}
                    />
                    <SidebarItem
                        value="QL Thiết bị"
                        onItemClick={() => {
                            navigate('/storage-only-c');
                        }}
                    />
                    <SidebarItem
                        value="Tra cứu TT bệnh nhân"
                        onItemClick={() => {
                            navigate('/patient-controller');
                        }}
                    />
                </>
            )}
            <SidebarItem
                onItemClick={() => {
                    handleSignOut();
                }}
                className="signout-button"
                value="Đăng xuất"
            />
        </div>
    );
}

export default Sidebar;
