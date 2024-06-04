import './SideberItem.scss';
function SidebarItem({ value, className, onItemClick }) {
    const handleClick = () => {
        onItemClick(value); // Gọi hàm xử lý sự kiện được truyền từ parent component
    };

    return (
        <h6 className={`d-flex sidebar-item ${className}`} onClick={handleClick}>
            {value}
        </h6>
    );
}

export default SidebarItem;
