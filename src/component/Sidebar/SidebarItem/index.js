import './SideberItem.scss';
import PropTypes from 'prop-types';
function SidebarItem({ value, className, onItemClick, isSelected }) {
    const handleClick = () => {
        onItemClick(value); // Gọi hàm xử lý sự kiện được truyền từ parent component
    };

    return (
        <h6 className={`d-flex sidebar-item ${className} ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            {value}
        </h6>
    );
}

SidebarItem.propTypes = {
    value: PropTypes.string.isRequired,
    onItemClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
};

SidebarItem.defaultProps = {
    isSelected: false,
};
export default SidebarItem;
