import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import './DefaultLayout.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function DefaultLayout({ children }) {
    const [isSidebarVisible, setSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className="container-main">
            <FontAwesomeIcon
                icon={faBars}
                onClick={toggleSidebar}
                className={`toggle-sidebar-icon ${!isSidebarVisible ? 'left' : 'mid'}`}
            />
            <div className="row">
                <div
                    className={`content-wrapper side-bar-wrapper ${
                        isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'
                    }`}
                >
                    <Sidebar />
                </div>
                <div
                    className={`content-wrapper body-wrapper ${
                        isSidebarVisible ? 'body-with-sidebar' : 'body-full-width'
                    }`}
                >
                    <Header />
                    <div className={'content'}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
