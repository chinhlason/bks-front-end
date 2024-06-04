import * as React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function DeviceStorageDif() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);
    const [devices, setDevices] = React.useState([]);
    const queryParameters = new URLSearchParams(window.location.search);
    const [selectedDeviceSerial, setSelectedDeviceSerial] = React.useState('');
    const patient = queryParameters.get('patient');
    const id = queryParameters.get('id');
    const nav = useNavigate();
    const fetchData = () => {
        httpRequest
            .get('/device/in-storage', { withCredentials: true })
            .then((response) => {
                // Sắp xếp dữ liệu theo ngày nhập
                const sortedByDate = response.data.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
                // Tiếp tục sắp xếp theo tên (nếu cần)
                const sortedDevices = sortedByDate.sort((a, b) => a.serial.localeCompare(b.serial));
                console.log(sortedDevices);
                setDevices(sortedDevices);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleDisable = (id, serial) => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn vô hiệu hoá thiết bị ${serial} này không?`);
        if (userConfirmed) {
            httpRequest
                .put(`/device/disable?device=${id}`, {}, { withCredentials: true })
                .then((response) => {
                    console.log('Device disabled:', response.data);
                    fetchData();
                })
                .catch((error) => {
                    console.error('Error disabling device:', error);
                });
        }
    };

    const handleActivate = (id, serial) => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn kích hoạt thiết bị ${serial} này không?`);
        if (userConfirmed) {
            httpRequest
                .put(`/device/enable?device=${id}`, {}, { withCredentials: true })
                .then((response) => {
                    console.log('Device activated:', response.data);
                    fetchData();
                })
                .catch((error) => {
                    console.error('Error activating device:', error);
                });
        }
    };

    const handleUpdate = (serial) => {
        setIsUpdateVisible(true);
        setSelectedDeviceSerial(serial);
    };

    const onSubmit = (data) => {
        const { newSerial } = data;
        const oldSerial = selectedDeviceSerial;

        httpRequest
            .put(`/device/update?oldserial=${oldSerial}&newserial=${newSerial}`, {}, { withCredentials: true })
            .then((response) => {
                console.log('Device updated:', response.data);
                setIsUpdateVisible(false);
                fetchData();
                alert('Cập nhật thành công');
            })
            .catch((error) => {
                console.error('Error updating device:', error);
            });
    };

    const data = React.useMemo(() => devices, [devices]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                Cell: ({ row }) => row.index + 1,
            },
            {
                Header: 'Serial',
                accessor: 'serial',
            },
            {
                Header: 'Ngày nhập',
                accessor: 'create_at',
                Cell: ({ value }) => moment(value).format('DD-MM-YYYY HH:mm:ss'),
            },
            {
                Header: 'Thời gian bảo hành (tháng)',
                accessor: 'warraty',
            },
            {
                Header: 'Trạng thái',
                accessor: 'status',
            },
            {
                Header: 'Thao tác',
                Cell: ({ row }) => (
                    <div className="buttons-action d-flex">
                        {row.original.status === 'DISABLED' ? (
                            <MDBBtn
                                className="handle-button"
                                color="success"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleActivate(row.original.id, row.original.serial);
                                }}
                            >
                                Kích hoạt
                            </MDBBtn>
                        ) : (
                            <MDBBtn
                                className="delete-button handle-button"
                                color="danger"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDisable(row.original.id, row.original.serial);
                                }}
                            >
                                Vô hiệu hoá
                            </MDBBtn>
                        )}
                        <MDBBtn
                            className="handle-button-update"
                            color="primary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUpdate(row.original.serial);
                            }}
                        >
                            Cập nhật
                        </MDBBtn>
                    </div>
                ),
            },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 10 } }, useSortBy, usePagination);

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
                        <div className="container update-wrapper">
                            <h2>Cập nhật thông tin thiết bị</h2>
                            <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mt-3">
                                    <label>Serial mới</label>
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Serial mới"
                                        {...register('newSerial', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                    {errors.newSerial && <span>{errors.newSerial.message}</span>}
                                </div>
                                <div className="d-grid gap-2 mt-4">
                                    <MDBBtn className="update-button" type="submit">
                                        Cập nhật
                                    </MDBBtn>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className="container">
                <h1>Danh sách thiết bị trong kho</h1>
                <MDBBtn
                    className="update-button"
                    onClick={() => {
                        nav('/add-device');
                    }}
                >
                    Thêm thiết bị
                </MDBBtn>
                <table {...getTableProps()} className="table mt-3">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="pagination">
                    <MDBBtn onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'Trang đầu'}
                    </MDBBtn>
                    <MDBBtn onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'Trang trước'}
                    </MDBBtn>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} / {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <MDBBtn onClick={() => nextPage()} disabled={!canNextPage}>
                        {'Trang sau'}
                    </MDBBtn>
                    <MDBBtn onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'Trang cuối'}
                    </MDBBtn>
                    <span>
                        | Tới trang:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {[5, 10, 20, 30, 40].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Hiển thị {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default DeviceStorageDif;
