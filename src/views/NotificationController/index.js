import { useState } from 'react';
import './NotificationController.scss';
function NotificationController() {
    const isAdmin = true;
    const [isConfirmed, setIsConfirmed] = useState(false);
    const isConfirmedTest = true;
    return (
        <div className="container py-5 add-course-content ">
            <div className="content pd-lr-9">
                <h1>Notification List</h1>
                <div className="notifications-box">
                    <div className="notification-item">
                        <div className="row">
                            <div className="col-xl-10 col-lg-8 col-md-8">
                                <p className="status">status : Confirmed</p>
                                <h2>From : Ngo Son</h2>
                                <h2>Message : DC_DSTT</h2>
                            </div>
                            <div
                                className={
                                    isAdmin
                                        ? 'col-xl-2 col-lg-4 col-md-4 btn-notification button-controller d-flex'
                                        : 'col-xl-2 col-lg-4 col-md-4 btn-notification button-controller d-none'
                                }
                            >
                                <button
                                    type="button"
                                    className="btn btn-primary btn-access"
                                    disabled={isConfirmedTest}
                                    onClick={() => {
                                        console.log(1);
                                    }}
                                >
                                    Access
                                </button>
                                <button type="button" className="btn btn-primary btn-deny" disabled={isConfirmedTest}>
                                    Deny
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationController;
