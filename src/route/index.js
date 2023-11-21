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
];

//Require login pages
const privateRoutes = [];

export { publicRoutes, privateRoutes };
