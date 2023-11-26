import { useState } from 'react';
// import './AddPurchase.scss';
import { useForm, Controller } from 'react-hook-form';

function UpdatePurchase() {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();
    return (
        <div className="container py-5 add-course-content">
            <div className="content pd-lr-9">
                <h1>Update Purchase</h1>
                <div className="purchases-box">
                    <form className="form-box form-add-course">
                        <div className="row">
                            <div className="form-group add-course  ">
                                <label className="option-course">User request (username)</label>
                                <textarea
                                    className="form-control mt-1 form-comment-control"
                                    placeholder="Username"
                                    {...register('username', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>

                            <div className="form-group add-course  ">
                                <label className="option-course mt-3">Course serial</label>
                                <textarea
                                    className="form-control mt-1 form-comment-control"
                                    placeholder="Course's serial"
                                    {...register('serial', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdatePurchase;
