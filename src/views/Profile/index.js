import { useForm, Controller } from 'react-hook-form';
import './Profile.scss';
import Avatar from '~/assets/img/avatar.png';
function Profile() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-md-6 box">
                    <h2 class="ppx-font-bold ppx-text-4xl ppx-capitalize mb-0 text-center"> Profile </h2>
                    <div class="px-5 py-4 ">
                        <div className="form-box-profile">
                            <div class="row mb-2 align-center">
                                <div class="col avatar-box">
                                    <img className="avatar" src={Avatar} alt="QR Code" />
                                </div>
                            </div>

                            <div class="row mb-2 align-center">
                                <div class="col"> Username </div>
                                <div class="col">sonnvt</div>
                            </div>
                            <div class="row mb-2 align-center">
                                <div class="col"> Fullname </div>
                                <div class="col">Ngo Vu Truong Son</div>
                            </div>
                            <div class="row mb-2 align-center">
                                <div class="col"> Email </div>
                                <div class="col">Sonnvt05@gmail.com</div>
                            </div>
                            <div class="row mb-2 align-center">
                                <div class="col"> Phone </div>
                                <div class="col">0923151911</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 box">
                    <h2 class="ppx-font-bold ppx-text-4xl ppx-capitalize mb-0 text-center"> Change password </h2>
                    <div class="px-5 py-4">
                        <form className="form-box-profile">
                            <div className="form-group ">
                                <label>Old Password</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="Old Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label>New Password</label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="New Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>

                            <div className="form-group mt-3">
                                <label>Confirm New Password </label>
                                <input
                                    className="form-control mt-1"
                                    placeholder="New Password"
                                    type="password"
                                    {...register('password', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
