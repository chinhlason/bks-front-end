import { useState } from 'react';
import './PurchaseController.scss';
function PurchaseController() {
    return (
        <div className="container py-5 add-course-content">
            <div className="content pd-lr-9">
                <h1>Purchases List</h1>
                <div className="purchases-box">
                    <div className="purchase-item">
                        <div className="row pd-lr-3">
                            <div className="col-xl-11 col-lg-10 col-md-10">
                                <h2>Purchase ID#1</h2>
                                <div className="d-flex date-controller">
                                    <p>Created at : 29/01/2002</p>
                                    <p className="ml-3">Updated at : 29/01/2002</p>
                                </div>
                                <h5>User request : Ngo Son (username : sonnvt)</h5>
                                <h5>Course : Math1 (DC_MATH1)</h5>
                            </div>
                            <div className="col-xl-1 col-lg-2 col-md-2 btn-purchase button-controller d-flex">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        console.log(1);
                                    }}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseController;
