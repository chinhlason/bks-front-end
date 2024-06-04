import * as React from 'react';
import { useTable, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function DeviceInUse() {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const roomName = queryParameters.get('name');
    const [selectedIdRecord, setSelectedIdRecord] = React.useState(null); // State to store the selected IdRecord
    const [roomDetail, setRoomDetail] = React.useState([]);
    const [maxPage, setMaxPage] = React.useState(1); // State to track the total number of pages

    const fetchRoomDetails = React.useCallback(() => {
        const URL = `/device/get-in-use`;
        httpRequest
            .get(URL, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                // Sort the data based on Device.serial alphabetically
                const sortedData = response.data.sort((a, b) => a.Device.serial.localeCompare(b.Device.serial));
                // Update the state with the sorted data
                setRoomDetail(sortedData);
                setMaxPage(response.data.Message); // Assuming the response has Message as maxPage
            })
            .catch((error) => {
                console.error('Error fetching room detail:', error);
            });
    }, []);

    React.useEffect(() => {
        fetchRoomDetails();
    }, [fetchRoomDetails]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                Cell: ({ row }) => row.index + 1,
            },
            {
                Header: 'Serial thiết bị',
                accessor: 'Device.serial',
            },
            {
                Header: 'Thời gian bảo hành',
                accessor: 'Device.warraty',
                Cell: ({ value }) => `${value} tháng`,
            },
            {
                Header: 'Tên phòng',
                accessor: 'Room',
            },
            {
                Header: 'Tên giường',
                accessor: 'Bed',
            },
            {
                Header: 'Thời gian bắt đầu sử dụng',
                accessor: 'InUseAt',
                Cell: ({ value }) => moment(value).format('DD/MM/YYYY HH:mm:ss'),
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
            data: roomDetail,
            initialState: { pageIndex: 0, pageSize: 10 }, // Start with page index 0 and page size of 10
        },
        usePagination,
    );

    return (
        <div className="App py-5">
            <div className="container">
                <h1>Danh sách thiết bị đang được sử dụng</h1>

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
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/patient?id=${row.original.IdRecord}`)}
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
            </div>
        </div>
    );
}

export default DeviceInUse;
