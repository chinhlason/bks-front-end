import './BedStorage.scss';
import * as React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function BedStorage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [isUpdateVisible, setIsUpdateVisible] = React.useState(false);
    const [devices, setDevices] = React.useState([]);
    const queryParameters = new URLSearchParams(window.location.search);
    const patient = queryParameters.get('patient');
    const id = queryParameters.get('id');
    const nav = useNavigate();
    const fetchData = () => {
        httpRequest
            .get('/bed/get-available')
            .then((response) => {
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
        ],
        [],
    );

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

    const handleChooseDevice = (row) => {
        const { name, Room } = row.original;
        const currentPage = window.location.pathname;

        // Kiểm tra nếu trang hiện tại không phải là '/room-controller'
        if (currentPage !== '/room-controller') {
            const userConfirmed = window.confirm(`Xác nhận chọn giường ${name} trong phòng ${Room.name} ?`);
            if (userConfirmed) {
                const requestBody = {
                    IdRecord: id,
                    BedName: name,
                    RoomName: Room.name,
                };

                httpRequest
                    .post('/bed/usage-bed', requestBody)
                    .then((response) => {
                        console.log(response.data);
                        nav(`/patient?id=${id}`);
                    })
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
    };

    return (
        <div className="App py-5">
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

export default BedStorage;
