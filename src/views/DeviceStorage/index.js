import './DeviceStorage.scss';
import * as React from 'react';
import { useTable, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function DeviceStorage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [devices, setDevices] = React.useState([]);
    const queryParameters = new URLSearchParams(window.location.search);
    const patient = queryParameters.get('patient');
    const id = queryParameters.get('id');
    const nav = useNavigate();

    const fetchData = () => {
        httpRequest
            .get('/device/get-by-option?value=IN_STORAGE&option=status')
            .then((response) => {
                console.log(response.data);
                if (response.data == null) {
                    setDevices([]);
                } else {
                    setDevices(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    React.useEffect(() => {
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
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }, // Start with page index 0 and page size of 10
        },
        usePagination,
    );

    const handleChooseDevice = (serial) => {
        const userConfirmed = window.confirm(`Xác nhận chọn thiết bị ${serial} ?`);
        if (userConfirmed) {
            const requestBody = {
                IdRecord: id,
                Serial: serial,
            };

            httpRequest
                .post('/device/use-device', requestBody)
                .then((response) => {
                    console.log(response.data);
                    nav(`/patient?id=${id}`);
                })
                .catch((error) => {
                    console.error('Error posting data:', error);
                });
        }
    };

    return (
        <div className="App py-5">
            <div className="container">
                <h1>Danh sách thiết bị trong kho</h1>

                {devices.length === 0 ? (
                    <div className="no-devices">Không có thiết bị trong kho</div>
                ) : (
                    <>
                        <table {...getTableProps()} className="table mt-3">
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
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            {...row.getRowProps()}
                                            onClick={() => handleChooseDevice(row.original.serial)}
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

                        {/* Pagination Controls */}
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
                    </>
                )}
            </div>
        </div>
    );
}

export default DeviceStorage;
