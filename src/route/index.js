import LayoutSidebar from '../component/LayoutSidebar';

import Home from '~/views/Home';
import Content from '~/views/Content';

//Not require login pages
const publicRoutes = [
    { path: '/', component: Home, layout: LayoutSidebar },
    { path: '/content', component: Content },
];

//Require login pages
const privateRoutes = [];

export { publicRoutes, privateRoutes };
