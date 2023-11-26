import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.scss';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import BKSLogo from '~/assets/img/BKS-logos.jpeg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faRightFromBracket, faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import Avatar from '~/assets/img/avatar.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import httpRequest from '~/utils/htppRequest';
const SIGNOUT_URL = '/user/auth/signout';

function Header() {
    // const isLogined = false;
    const navigate = useNavigate();
    const [isLogined, setIsLogined] = useState(false);
    const [fullName, setFullName] = useState('');
    useEffect(() => {
        const Login = localStorage.getItem('isLogined');
        const fullNameFromLS = localStorage.getItem('fullname');
        console.log(Login);
        if (Login !== null) {
            setIsLogined(true);
            setFullName(fullNameFromLS);
        } else {
            setIsLogined(false);
            setFullName('');
        }
    });

    const signOut = () => {
        httpRequest
            .post(SIGNOUT_URL, {}, { withCredentials: true })
            .then((response) => {
                localStorage.removeItem('id');
                localStorage.removeItem('username');
                localStorage.removeItem('fullname');
                localStorage.removeItem('phone');
                localStorage.removeItem('email');
                localStorage.removeItem('role');
                localStorage.removeItem('isLogined');
                navigate('/');
            })
            .catch((err) => {
                console.log('notok');
            });
    };
    console.log(fullName);
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container className="container-header">
                <Navbar.Brand
                    onClick={() => {
                        navigate('/');
                    }}
                    className="logo-home"
                >
                    <img className="bks-logo" src={BKSLogo} alt="QR Code" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <div
                            className={isLogined ? 'user-profile-dropdown-menu d-block' : 'user-profile-dropdown-menu'}
                        >
                            <h4 className="auth-route d-none mt-3">Hello {fullName}!</h4>
                            <Nav.Link className="auth-route d-none" href="#">
                                <FontAwesomeIcon icon={faUser} className="icon" />
                                View profile
                            </Nav.Link>
                            <Nav.Link className="auth-route d-none" href="#">
                                <FontAwesomeIcon icon={faBook} className="icon" />
                                View your owned courses
                            </Nav.Link>

                            <Nav.Link className="auth-route d-none" href="#">
                                <FontAwesomeIcon icon={faBell} className="icon" />
                                Notification
                            </Nav.Link>
                            <Nav.Link className="auth-route d-none sign-out" onClick={signOut}>
                                <FontAwesomeIcon icon={faRightFromBracket} className="icon" />
                                Sign out
                            </Nav.Link>
                        </div>
                        <NavDropdown title="Courses" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">General Courses</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Core Major Courses</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Specialized Courses</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Foreign Language</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">Posts</Nav.Link>
                        <Nav.Link href="#">Documents</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                        <Nav.Link href="#">Payment</Nav.Link>
                        <NavDropdown.Divider />
                        <div className={isLogined ? 'authen-dropdown-menu' : 'authen-dropdown-menu d-block'}>
                            <Nav.Link
                                className="auth-route d-none login"
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                Log in
                            </Nav.Link>
                            <Nav.Link className="auth-route d-none" href="#">
                                Sign up
                            </Nav.Link>
                        </div>
                    </Nav>
                </Navbar.Collapse>

                <div className={isLogined ? 'authentication-wrap ' : 'authentication-wrap d-flex'}>
                    <Col xs="auto">
                        <Button
                            className="auth-button"
                            type="button"
                            onClick={() => {
                                navigate('/login');
                            }}
                        >
                            Log in
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button className="auth-button" type="button">
                            Sign up
                        </Button>
                    </Col>
                </div>

                <Navbar.Brand className={isLogined ? 'logined-wrap d-block' : 'logined-wrap'}>
                    <div className="btn-group">
                        <a
                            className="btndropdown-toggle  bell d-flex"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <Col xs="auto">
                                <FontAwesomeIcon icon={faBell} />
                            </Col>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">Sex</ul>
                    </div>

                    <div className="btn-group">
                        <a
                            className="btndropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <Col xs="auto profile d-flex">
                                <img className="avatar" src={Avatar} alt="avatar" />
                            </Col>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button className="dropdown-item" type="button">
                                    View profile
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button">
                                    View your owned courses
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" type="button" onClick={signOut}>
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;
