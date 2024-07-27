import * as React from 'react';
import { useTable, usePagination } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';

function BedInUse() {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const roomName = queryParameters.get('name');
    const [selectedIdRecord, setSelectedIdRecord] = React.useState(null); // State to store the selected IdRecord
    const [roomDetail, setRoomDetail] = React.useState([]);
    const [maxPage, setMaxPage] = React.useState(1); // State to track the total number of pages

    const fetchRoomDetails = React.useCallback(() => {
        const URL = `/bed/get-used-bed`;
        httpRequest
            .get(URL)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => {
                    // So sánh tên phòng
                    if (a.RoomName < b.RoomName) {
                        return -1;
                    }
                    if (a.RoomName > b.RoomName) {
                        return 1;
                    }
                    // Nếu tên phòng giống nhau, so sánh tên giường
                    if (a.BedName < b.BedName) {
                        return -1;
                    }
                    if (a.BedName > b.BedName) {
                        return 1;
                    }
                    return 0;
                });

                setRoomDetail(sortedData);
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
                Header: 'Tên phòng',
                accessor: 'RoomName',
            },
            {
                Header: 'Tên giường',
                accessor: 'BedName',
            },
            {
                Header: 'Bệnh nhân',
                accessor: 'PatientName',
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
                <h1>Danh sách giường bệnh đang được sử dụng</h1>

                <table {...getTableProps()} className="table mt-5">
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

export default BedInUse;
