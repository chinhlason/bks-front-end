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

function Header() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img className="bks-logo" src={BKSLogo} alt="QR Code" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
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
                        <Nav.Link className="auth-route d-none login" href="#">
                            Log in
                        </Nav.Link>
                        <Nav.Link className="auth-route d-none" href="#">
                            Sign up
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <div className="authentication-wrap d-flex">
                    <Col xs="auto">
                        <Button className="auth-button" type="submit">
                            Log in
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button className="auth-button" type="submit">
                            Sign up
                        </Button>
                    </Col>
                </div>
            </Container>
        </Navbar>
    );
}

export default Header;
