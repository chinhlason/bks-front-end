import LayoutSidebar from '../component/LayoutSidebar';

import Home from '~/views/Home';
import Content from '~/views/Content';
import Login from '~/views/Login';
import SignUp from '~/views/Signup';
import Profile from '~/views/Profile';
import GeneralCourse from '~/views/GeneralCourse';
import CourseDetail from '~/views/CourseDetail';
import PostsGeneral from '~/views/PostsGeneral';
import PostDetail from '~/views/PostDetail';
import Lesson from '~/views/Lesson';
import Controller from '~/views/ADMIN/Controller';
import AddCourse from '~/views/ADMIN/CourseController/AddCourse';
import UpdateCourse from '~/views/ADMIN/CourseController/UpdateCourse';
import AddPost from '~/views/ADMIN/PostController/AddPost';
import NotificationController from '~/views/NotificationController';
import PurchaseController from '~/views/ADMIN/PurchaseController';
import AddPurchase from '~/views/ADMIN/PurchaseController/AddPurchase';
import UpdatePurchase from '~/views/ADMIN/PurchaseController/UpdatePurchase';
//Not require login pages
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/content', component: Content },
    { path: '/login', component: Login },
    { path: '/register', component: SignUp },
    { path: '/profile', component: Profile },
    { path: '/courses', component: GeneralCourse },
    { path: '/course-detail', component: CourseDetail },
    { path: '/posts', component: PostsGeneral },
    { path: '/post', component: PostDetail },
    { path: '/lesson', component: Lesson },
    { path: '/admin-controller', component: Controller },
    { path: '/admin-add-course', component: AddCourse },
    { path: '/admin-update-course', component: UpdateCourse },
    { path: '/admin-add-post', component: AddPost },
    { path: '/admin-purchase', component: PurchaseController },
    { path: '/notification', component: NotificationController },
    { path: '/admin-add-purchase', component: AddPurchase },
    { path: '/admin-update-purchase', component: UpdatePurchase },
];

//Require login pages
const privateRoutes = [];

export { publicRoutes, privateRoutes };
