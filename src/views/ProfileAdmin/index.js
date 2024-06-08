import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Avatar from '~/assets/img/avatar.png';
import httpRequest from '~/util/httpRequest';
import { useNavigate } from 'react-router-dom';

function ProfileAdmin() {
    const [profileData, setProfileData] = useState(null);
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get('id');
    useEffect(() => {
        // Fetch profile data
        httpRequest
            .get(`/user/get?id=${id}`)
            .then((response) => {
                setProfileData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching profile data:', error);
            });
    }, []);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row py-5 container">
                <h2 className="ppx-font-bold ppx-text-4xl ppx-capitalize mb-0 text-center">Thông tin cá nhân</h2>
                <div className="px-5 py-4">
                    <div className="form-box-profile">
                        <div className="row mb-2 align-center">
                            <div className="col">Username</div>
                            <div className="col">{profileData.doctor_code}</div>
                        </div>
                        <div className="row mb-2 align-center">
                            <div className="col">Fullname</div>
                            <div className="col">{profileData.fullname}</div>
                        </div>
                        <div className="row mb-2 align-center">
                            <div className="col">Email</div>
                            <div className="col">{profileData.email}</div>
                        </div>
                        <div className="row mb-2 align-center">
                            <div className="col">Phone</div>
                            <div className="col">{profileData.phone}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileAdmin;
