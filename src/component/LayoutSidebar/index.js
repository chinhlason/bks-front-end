import Header from '../Header';
import Sidebar from '../Sidebar';

function LayoutSidebar({ children }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className={'container'}>
                <div className={'content'}>{children}</div>
            </div>
        </div>
    );
}

export default LayoutSidebar;
