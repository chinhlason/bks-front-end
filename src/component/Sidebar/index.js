import React, { useState } from 'react';
import './Sidebar.scss';
import Col from 'react-bootstrap/Col';
import Avatar from '~/assets/img/avatar.png';
import SidebarItem from './SidebarItem';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const navigate = useNavigate();
    const role = localStorage.getItem('Role');
    const fullname = localStorage.getItem('Fullname');

    const handleSignOut = () => {
        httpRequest
            .post(`/log-out`)
            .then((response) => {
                document.cookie = 'jwt' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = 'refresh-token' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                navigate('/');
            })
            .catch((error) => {
                console.error('There was an error logging out!', error);
            });
    };

    const handleItemClick = (item, path) => {
        setSelectedItem(item);
        navigate(path);
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={`side-bar ${isSidebarVisible ? 'visible' : 'hidden'}`}>
            {isSidebarVisible && (
                <>
                    <div
                        className="profile-doctor"
                        onClick={() => {
                            handleItemClick('profile', '/profile');
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
                                isSelected={selectedItem === 'QL Phòng bệnh'}
                                onItemClick={() => handleItemClick('QL Phòng bệnh', '/mainpage-admin')}
                            />
                            <SidebarItem
                                value="QL Tài khoản"
                                isSelected={selectedItem === 'QL Tài khoản'}
                                onItemClick={() => handleItemClick('QL Tài khoản', '/account-admin')}
                            />
                            <SidebarItem
                                value="QL Bệnh nhân"
                                isSelected={selectedItem === 'QL Bệnh nhân'}
                                onItemClick={() => handleItemClick('QL Bệnh nhân', '/patient-controller-admin')}
                            />
                            <SidebarItem
                                value="QL Thiết bị"
                                isSelected={selectedItem === 'QL Thiết bị'}
                                onItemClick={() => handleItemClick('QL Thiết bị', '/device-in-use-admin')}
                            />
                            <SidebarItem
                                value="Kho Thiết bị"
                                isSelected={selectedItem === 'Kho Thiết bị'}
                                onItemClick={() => handleItemClick('Kho Thiết bị', '/storage-only-c')}
                            />
                        </>
                    ) : (
                        <>
                            <SidebarItem
                                value="Trang chủ"
                                isSelected={selectedItem === 'Trang chủ'}
                                onItemClick={() => handleItemClick('Trang chủ', '/mainpage')}
                            />
                            <SidebarItem
                                value="Thông tin cá nhân"
                                isSelected={selectedItem === 'Thông tin cá nhân'}
                                onItemClick={() => handleItemClick('Thông tin cá nhân', '/profile')}
                            />
                            <SidebarItem
                                value="QL Chung"
                                isSelected={selectedItem === 'QL Chung'}
                                onItemClick={() => handleItemClick('QL Chung', '/room-controller')}
                            />
                            <SidebarItem
                                value="QL Thiết bị"
                                isSelected={selectedItem === 'QL Thiết bị'}
                                onItemClick={() => handleItemClick('QL Thiết bị', '/storage-only-c')}
                            />
                            <SidebarItem
                                value="Tra cứu TT bệnh nhân"
                                isSelected={selectedItem === 'Tra cứu TT bệnh nhân'}
                                onItemClick={() => handleItemClick('Tra cứu TT bệnh nhân', '/patient-controller')}
                            />
                        </>
                    )}
                    <SidebarItem
                        value="Đăng xuất"
                        isSelected={selectedItem === 'Đăng xuất'}
                        onItemClick={handleSignOut}
                        className="signout-button"
                    />
                </>
            )}
        </div>
    );
}

export default Sidebar;
