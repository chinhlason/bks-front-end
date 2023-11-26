import './Controller.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { useForm } from 'react-hook-form';

function Controller() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const isUserController = false;
    return (
        <div className="container py-5">
            <h1>ADMIN CONTROLLER</h1>
            <div className="options-controller d-flex row">
                <div className="col-xl-2 col-md-4 ">
                    <div className="category-detail  active ">User </div>
                </div>
                <div className="col-xl-2 col-md-4 ">
                    <div className="category-detail">Courses </div>
                </div>
                <div className="col-xl-2 col-md-4 ">
                    <div className="category-detail">Posts </div>
                </div>
                <div className="col-xl-2 col-md-4 ">
                    <div className="category-detail">Notification </div>
                </div>
                <div className="col-xl-2 col-md-4 ">
                    <div className="category-detail">Purchase </div>
                </div>
            </div>

            <h3>List of service</h3>

            <form className="form-box row form-search">
                <div className="form-group mt-3 col-xl-10 col-md-9">
                    <input
                        className="form-control mt-1"
                        placeholder="Type something you want to search"
                        {...register('search', {
                            required: 'Please enter complete information!',
                        })}
                    />
                </div>

                <div className="d-grid gap-2 mt-3 col-xl-2 col-md-3">
                    <button type="submit" className="btn btn-primary">
                        Search
                        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
                    </button>
                </div>
            </form>
            <div className="controller-table">
                <div className="controller-item">
                    <div className="row">
                        <div className="col-xl-10 col-sm-9">
                            <h3>Name: How can i get a cookie from a letter?</h3>

                            <p>More: First, take care yourself and dont forget to get a bottle from my document</p>
                        </div>

                        <div className="col-xl-2 col-sm-3 button-controller d-flex">
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item d-block'
                                        : 'btn btn-primary btn-controller-item'
                                }
                            >
                                Detail
                            </button>
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item'
                                        : 'btn btn-primary btn-controller-item d-block'
                                }
                            >
                                {' '}
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <div className="controller-item">
                    <div className="row">
                        <div className="col-xl-10 col-sm-9">
                            <h3>Name: How can i get a cookie from a letter?</h3>

                            <p>More: First, take care yourself and dont forget to get a bottle from my document</p>
                        </div>

                        <div className="col-xl-2 col-sm-3 button-controller d-flex">
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item d-block'
                                        : 'btn btn-primary btn-controller-item'
                                }
                            >
                                Detail
                            </button>
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item'
                                        : 'btn btn-primary btn-controller-item d-block'
                                }
                            >
                                {' '}
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <div className="controller-item">
                    <div className="row">
                        <div className="col-xl-10 col-sm-9">
                            <h3>Name: How can i get a cookie from a letter?</h3>

                            <p>More: First, take care yourself and dont forget to get a bottle from my document</p>
                        </div>

                        <div className="col-xl-2 col-sm-3 button-controller d-flex">
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item d-block'
                                        : 'btn btn-primary btn-controller-item'
                                }
                            >
                                Detail
                            </button>
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item'
                                        : 'btn btn-primary btn-controller-item d-block'
                                }
                            >
                                {' '}
                                Update
                            </button>
                        </div>
                    </div>
                </div>
                <div className="controller-item">
                    <div className="row">
                        <div className="col-xl-10 col-sm-9">
                            <h3>Name: How can i get a cookie from a letter?</h3>

                            <p>More: First, take care yourself and dont forget to get a bottle from my document</p>
                        </div>

                        <div className="col-xl-2 col-sm-3 button-controller d-flex">
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item d-block'
                                        : 'btn btn-primary btn-controller-item'
                                }
                            >
                                Detail
                            </button>
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item'
                                        : 'btn btn-primary btn-controller-item d-block'
                                }
                            >
                                {' '}
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <div className="controller-item">
                    <div className="row">
                        <div className="col-xl-10 col-sm-9">
                            <h3>Name: How can i get a cookie from a letter?</h3>

                            <p>More: First, take care yourself and dont forget to get a bottle from my document</p>
                        </div>

                        <div className="col-xl-2 col-sm-3 button-controller d-flex">
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item d-block'
                                        : 'btn btn-primary btn-controller-item'
                                }
                            >
                                Detail
                            </button>
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item'
                                        : 'btn btn-primary btn-controller-item d-block'
                                }
                            >
                                {' '}
                                Update
                            </button>
                        </div>
                    </div>
                </div>

                <div className="controller-item">
                    <div className="row">
                        <div className="col-xl-10 col-sm-9">
                            <h3>Name: How can i get a cookie from a letter?</h3>

                            <p>More: First, take care yourself and dont forget to get a bottle from my document</p>
                        </div>

                        <div className="col-xl-2 col-sm-3 button-controller d-flex">
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item d-block'
                                        : 'btn btn-primary btn-controller-item'
                                }
                            >
                                Detail
                            </button>
                            <button
                                className={
                                    isUserController
                                        ? 'btn btn-primary btn-controller-item'
                                        : 'btn btn-primary btn-controller-item d-block'
                                }
                            >
                                {' '}
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Controller;
