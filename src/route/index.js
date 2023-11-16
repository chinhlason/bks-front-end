import LayoutSidebar from '../component/LayoutSidebar';

import Home from '~/views/Home';
import Content from '~/views/Content';
import Login from '~/views/Login';
import SignUp from '~/views/Signup';

//Not require login pages
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/content', component: Content },
    { path: '/login', component: Login },
    { path: '/register', component: SignUp },
];

//Require login pages
const privateRoutes = [];

export { publicRoutes, privateRoutes };
