import Home from '~/views/Home';
import Login from '~/views/Login';
import SignUp from '~/views/Signup';
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
//Not require login pages
const publicRoutes = [
    { path: '/mainpage', component: Home },
    { path: '/', component: Login, layout: LayoutOnlyContent },
    { path: '/register', component: SignUp, layout: LayoutOnlyContent },
    { path: '/profile', component: Profile },
    { path: '/room', component: RoomDetail },
    { path: '/patient', component: PatientDetail },
    { path: '/pending-record', component: PendingRecord },
    { path: '/device', component: DeviceController },
    { path: '/storage', component: DeviceStorage },
    { path: '/storage-only-c', component: DeviceStorageDif },
    { path: '/bed-storage', component: BedStorage },
    { path: '/bed-storage-only-c', component: BedStorageOnlyC },
    { path: '/room-controller', component: RoomController },
    { path: '/patient-controller', component: PatientController },
    { path: '/add-patient', component: AddPatient },
    { path: '/add-device', component: AddDevice },
    { path: '/add-bed', component: AddBed },
    { path: '/device-in-use', component: DeviceInUse },
    { path: '/bed-in-use', component: BedInUse },
];

//Require login pages
const privateRoutes = [];

export { publicRoutes, privateRoutes };
