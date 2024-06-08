import * as React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function BedStorageOnlyC() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);
    const [devices, setDevices] = React.useState([]);
    const [bedName, setBedName] = React.useState('');
    const [roomName, setRoomName] = React.useState('');
    const queryParameters = new URLSearchParams(window.location.search);
    const patient = queryParameters.get('patient');
    const id = queryParameters.get('id');
    const nav = useNavigate();
    const fetchData = () => {
        httpRequest
            .get('/bed/storage')
            .then((response) => {
                console.log(response.data);
                const sortedData = response.data.sort((a, b) => {
                    if (a.Room.name < b.Room.name) return -1;
                    if (a.Room.name > b.Room.name) return 1;
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                setDevices(sortedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const [selectedBedId, setSelectedBedId] = React.useState('');

    React.useEffect(() => {
        // Fetch data from the API
        fetchData();
    }, []);

    const data = React.useMemo(() => devices, [devices]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                Cell: ({ row }) => row.index + 1,
            },
            {
                Header: 'Tên giường',
                accessor: 'name',
            },
            {
                Header: 'Trạng thái',
                accessor: 'status',
            },
            {
                Header: 'Phòng',
                accessor: 'Room.name',
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
                                    handleActivate(row.original.id, row.original.name);
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
                                    handleDisable(row.original.id, row.original.name);
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
                                e.stopPropagation(); // Prevent row click event from being triggered
                                handleUpdate(row.original.name, row.original.Room.name);
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

    const handleDisable = (id, name) => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn vô hiệu hoá giường ${name} này không?`);
        if (userConfirmed) {
            httpRequest
                .put(`/bed/disable?bed=${id}`, {})
                .then((response) => {
                    console.log('Device disabled:', response.data);
                    fetchData();
                })
                .catch((error) => {
                    console.error('Error disabling device:', error);
                });
        }
    };

    const handleActivate = (id, name) => {
        const userConfirmed = window.confirm(`Bạn có chắc chắn muốn kích hoạt thiết bị ${name} này không?`);
        if (userConfirmed) {
            httpRequest
                .put(`/bed/enable?bed=${id}`, {})
                .then((response) => {
                    console.log('Device activated:', response.data);
                    fetchData();
                })
                .catch((error) => {
                    console.error('Error activating device:', error);
                });
        }
    };
    const handleUpdate = (bed, room) => {
        setIsUpdateVisible(true);
        setBedName(bed);
        setRoomName(room);
        console.log('Updating item with id:', bed, room);
    };
    const onSubmit = (data) => {
        const dataReq = {
            Name: data.newName,
            RoomName: roomName,
            Status: 'AVAILABLE',
            OldName: bedName,
            OldRoomName: roomName,
        };
        console.log(dataReq);
        httpRequest
            .put(`/bed/update`, dataReq)
            .then((response) => {
                console.log('Device updated:', response.data);
                setIsUpdateVisible(false);
                fetchData();
                alert('Cập nhật thành công');
                reset();
            })
            .catch((error) => {
                console.error('Error updating device:', error);
            });
    };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using rows, we'll use page
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

    const handleChooseDevice = (row) => {};

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
                            <h2>Cập nhật thông tin giường bệnh</h2>
                            <form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mt-3">
                                    <label>Tên mới</label>
                                    <input
                                        className="form-control mt-1"
                                        placeholder="Tên mới"
                                        {...register('newName', {
                                            required: 'Please enter complete information!',
                                        })}
                                    />
                                    {errors.newName && <span>{errors.newName.message}</span>}
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
                <h1>Danh sách các giường có thể sử dụng</h1>

                <table {...getTableProps()} className="table mt-3">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps(column.getSortByToggleProps())}
                                        className={
                                            column.isSorted ? (column.isSortedDesc ? 'sorted-desc' : 'sorted-asc') : ''
                                        }
                                    >
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
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => handleChooseDevice(row)}
                                    style={{ cursor: 'pointer' }}
                                >
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

export default BedStorageOnlyC;
