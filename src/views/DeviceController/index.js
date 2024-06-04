import './DeviceController.scss';
import fakeData from './MOCK_DATA.json';
import * as React from 'react';
import { useTable } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';

function DeviceController() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);

    const data = React.useMemo(() => fakeData, []);
    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                accessor: 'id',
            },
            {
                Header: 'Serial',
                accessor: 'serial',
            },
            {
                Header: 'Giường bệnh',
                accessor: 'bed',
            },
            {
                Header: 'Ngày nhập',
                accessor: 'date_added',
            },
            {
                Header: 'Thời gian bảo hành (tháng)',
                accessor: 'warranty_period',
            },
            {
                Header: 'Thao tác',
                Cell: ({ row }) => (
                    <div className="buttons-action d-flex">
                        <MDBBtn
                            className="handle-button"
                            color="primary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent row click event from being triggered
                                handleUpdate(row.original.id);
                            }}
                        >
                            Cập nhật
                        </MDBBtn>
                        <MDBBtn
                            className="delete-button handle-button"
                            color="danger"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent row click event from being triggered
                                handleDelete(row.original.id);
                            }}
                        >
                            Vô hiệu hoá
                        </MDBBtn>
                    </div>
                ),
            },
        ],
        [],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const handleDelete = (id) => {
        // Logic to delete the item with the given id
        console.log('Deleting item with id:', id);
    };

    const handleUpdate = (id) => {
        setIsUpdateVisible(true);
        console.log('Updating item with id:', id);
    };

    return (
        <div className="App py-5">
            {isUpdateVisible && (
                <div>
                    <div
                        className="update-overlay"
                        onClick={() => {
                            setIsUpdateVisible(false);
                        }}
                    ></div>
                    <div className="update-modal">
                        <div className="container update-wrapper ">
                            <h2>Cập nhật thông tin thiết bị</h2>
                            <form className="form-box">
                                <div className="form-group mt-3">
                                    <label>Serial</label>
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Serial"
                                        {...register('username', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Giường bệnh</label>
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Giường bệnh"
                                        type="password"
                                        {...register('password', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Ngày nhập</label>
                                    <input
                                        className="form-control mt-1"
                                        type="date"
                                        {...register('password', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Thời gian bảo hành (tháng)</label>
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Thời gian bảo hành"
                                        {...register('password', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <MDBBtn
                                        className="update-button"
                                        type="submit"
                                        onClick={() => setIsUpdateVisible(false)}
                                    >
                                        cập nhật
                                    </MDBBtn>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div className="container">
                <h1> Danh sách thiết bị tại phòng 101 (10) </h1>
                <div className="d-flex">
                    <select className="form-select mt-3 mb-3 col-md-8" aria-label="Default select example">
                        <option selected>Chọn phòng</option>
                        <option value="1">101</option>
                        <option value="2">102</option>
                        <option value="3">103</option>
                    </select>
                    <div className="col-md-4 add-patient-btn-wrapper ml-10">
                        <MDBBtn
                            className="add-patient-btn"
                            onClick={() => {
                                navigate('/add-device');
                            }}
                        >
                            Thêm thiết bị
                        </MDBBtn>
                    </div>
                </div>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DeviceController;
