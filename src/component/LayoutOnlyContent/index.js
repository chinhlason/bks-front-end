import Header from '../Header';
import Sidebar from '../Sidebar';

function LayoutOnlyContent({ children }) {
    return (
        <div>
            <div className={'wrapper'}>
                <div className={'content'}>{children}</div>
            </div>
        </div>
    );
}

export default LayoutOnlyContent;
