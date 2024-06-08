import * as React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function AccountController() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [devices, setDevices] = React.useState([]);
    const queryParameters = new URLSearchParams(window.location.search);
    const [selectedIdRecord, setSelectedIdRecord] = React.useState(null);
    const nav = useNavigate();
    const fetchData = () => {
        httpRequest
            .get('/user/get-all-doctors')
            .then((response) => {
                // Sắp xếp dữ liệu theo ngày nhập
                const sortedByName = response.data.sort((a, b) => a.fullname.localeCompare(b.fullname));
                console.log(sortedByName);
                setDevices(sortedByName);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleDisable = (id, serial) => {
        // const userConfirmed = window.confirm(`Bạn có chắc chắn muốn vô hiệu hoá thiết bị ${serial} này không?`);
        // if (userConfirmed) {
        //     httpRequest
        //         .put(`/device/disable?device=${id}`, {}, { withCredentials: true })
        //         .then((response) => {
        //             console.log('Device disabled:', response.data);
        //             fetchData();
        //         })
        //         .catch((error) => {
        //             console.error('Error disabling device:', error);
        //         });
        // }
    };
    const handleRowClick = (row) => {
        navigate(`/profile-admin?id=${row.original.id}`);
    };
    const handleActivate = (id, serial) => {
        // const userConfirmed = window.confirm(`Bạn có chắc chắn muốn kích hoạt thiết bị ${serial} này không?`);
        // if (userConfirmed) {
        //     httpRequest
        //         .put(`/device/enable?device=${id}`, {}, { withCredentials: true })
        //         .then((response) => {
        //             console.log('Device activated:', response.data);
        //             fetchData();
        //         })
        //         .catch((error) => {
        //             console.error('Error activating device:', error);
        //         });
        // }
    };

    const handleUpdate = (doctorCode) => {
        const userConfirmed = window.confirm(`Xác nhận thay đổi quyền của bác sĩ có mã bác sĩ là ${doctorCode} ?`);
        if (userConfirmed) {
            httpRequest
                .put(`/user/change-permission?doctorcode=${doctorCode}`, {})
                .then((response) => {
                    fetchData();
                })
                .catch((error) => {
                    console.error('Error activating device:', error);
                });
        }
    };

    const data = React.useMemo(() => devices, [devices]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                Cell: ({ row }) => row.index + 1,
            },
            {
                Header: 'Họ tên',
                accessor: 'fullname',
            },
            {
                Header: 'DoctorCode',
                accessor: 'doctor_code',
            },

            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Số điện thoại',
                accessor: 'phone',
            },
            {
                Header: 'Quyền',
                accessor: 'role',
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
                                className="delete-button disable-btn handle-button"
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
                                handleUpdate(row.original.doctor_code);
                            }}
                        >
                            Thay đổi quyền
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
            <div className="container">
                <h1>Danh sách tài khoản người dùng</h1>
                <MDBBtn
                    className="update-button"
                    onClick={() => {
                        nav('/add-account');
                    }}
                >
                    Tạo tài khoản
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
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => handleRowClick(row)}
                                    className={selectedIdRecord === row.original.IdRecord ? 'selected-row' : ''}
                                    {...row.getRowProps()}
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

export default AccountController;
