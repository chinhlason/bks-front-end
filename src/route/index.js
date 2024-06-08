import Home from '~/views/Home';
import Login from '~/views/Login';
import Profile from '~/views/Profile';
import LayoutOnlyContent from '~/component/LayoutOnlyContent';
import RoomDetail from '~/views/RoomDetail';
import PatientDetail from '~/views/PatientDetail';
import DeviceController from '~/views/DeviceController';
import RoomController from '~/views/roomController';
import PatientController from '~/views/PatientController';
import AddPatient from '~/views/AddPatient';
import AddDevice from '~/views/AddDevice';
import AddBed from '~/views/AddBed';
import DeviceStorage from '~/views/DeviceStorage';
import DeviceStorageDif from '~/views/DeviceStorageSeen';
import BedStorage from '~/views/BedStorage';
import PendingRecord from '~/views/PendingRecord';
import BedStorageOnlyC from '~/views/BedStorageOnlyC';
import DeviceInUse from '~/views/DeviceInUse';
import BedInUse from '~/views/BedInUse';
import HomeAdmin from '~/views/HomeAdmin';
import AddRoom from '~/views/AddRoom';
import AccountController from '~/views/AccountController';
import AddAccount from '~/views/AddAccount';
import PatientControllerByAdmin from '~/views/PatientControllerByAdmin';
import RoomDetailAdmin from '~/views/RoomDetailAdmin';
import ProfileAdmin from '~/views/ProfileAdmin';
import DeviceInUseAdmin from '~/views/DeviceInUseAdmin';
import ForgotPassword from '~/views/ForgotPassword';
import ResetPassword from '~/views/ResetPassword';
//Not require login pages
const publicRoutes = [
    { path: '/mainpage', component: Home },
    { path: '/mainpage-admin', component: HomeAdmin },
    { path: '/account-admin', component: AccountController },
    { path: '/add-account', component: AddAccount },
    { path: '/', component: Login, layout: LayoutOnlyContent },
    { path: '/profile', component: Profile },
    { path: '/profile-admin', component: ProfileAdmin },
    { path: '/room', component: RoomDetail },
    { path: '/room-admin', component: RoomDetailAdmin },
    { path: '/patient', component: PatientDetail },
    { path: '/pending-record', component: PendingRecord },
    { path: '/device', component: DeviceController },
    { path: '/storage', component: DeviceStorage },
    { path: '/storage-only-c', component: DeviceStorageDif },
    { path: '/bed-storage', component: BedStorage },
    { path: '/bed-storage-only-c', component: BedStorageOnlyC },
    { path: '/room-controller', component: RoomController },
    { path: '/patient-controller', component: PatientController },
    { path: '/patient-controller-admin', component: PatientControllerByAdmin },
    { path: '/add-patient', component: AddPatient },
    { path: '/add-room', component: AddRoom },
    { path: '/add-device', component: AddDevice },
    { path: '/add-bed', component: AddBed },
    { path: '/device-in-use', component: DeviceInUse },
    { path: '/device-in-use-admin', component: DeviceInUseAdmin },
    { path: '/bed-in-use', component: BedInUse },
    { path: '/forgot-password', component: ForgotPassword, layout: LayoutOnlyContent },
    { path: '/reset-password', component: ResetPassword, layout: LayoutOnlyContent },
];

//Require login pages
const privateRoutes = [];

export { publicRoutes, privateRoutes };
