import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import QRImage from '~/assets/img/QR.jpg';
function Footer() {
    return (
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-sm-6">
                        <div class="single-box">
                            <img
                                className="logo"
                                src="https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg"
                                alt="logo"
                            />
                            <h3>Who are we</h3>
                            <p>A development from HUST, made this web to make HUST great again, Yes sir!</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="single-box">
                            <h2>Provide service</h2>
                            <ul>
                                <li>
                                    <a href="#">Education & Only education</a>
                                </li>
                                <li>
                                    <a href="#">Education Again</a>
                                </li>
                                <li>
                                    <a href="#">Handsome</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="single-box">
                            <h2>Follow us on</h2>
                            <ul>
                                <li>
                                    <a className="icon-contact" href="https://www.facebook.com/truongsonnv2002">
                                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a className="icon-contact" href="https://www.instagram.com/">
                                        <FontAwesomeIcon icon={faInstagram} /> Instagram
                                    </a>
                                </li>
                                <li>
                                    <a className="icon-contact" href="https://twitter.com/?lang=vi">
                                        <FontAwesomeIcon icon={faTwitter} /> Twitter
                                    </a>
                                </li>
                                <li>
                                    <a className="icon-contact" href="https://www.linkedin.com/">
                                        <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="single-box">
                            <h2>Donate for me at!</h2>
                            <img className="qr-code" src={QRImage} alt="QR Code" />

                            <h2>Contact with us by email below!</h2>
                            <p class="socials">sonnvt05@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
