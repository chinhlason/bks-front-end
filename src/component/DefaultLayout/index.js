import Header from '../Header';
import Sidebar from '../Sidebar';
import './DefaultLayout.scss';

function DefaultLayout({ children }) {
    return (
        <div className="container-main">
            <div className="row">
                <div className="col-md-2 content-wrapper side-bar-wrapper">
                    <Sidebar />
                </div>
                <div className="col-md-10 content-wrapper body-wrapper">
                    <Header />
                    <div className={'content'}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
