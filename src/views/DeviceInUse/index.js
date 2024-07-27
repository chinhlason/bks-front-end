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
    const [selectedIdRecord, setSelectedIdRecord] = React.useState(null);
    const [roomDetail, setRoomDetail] = React.useState([]);
    const [online, setOnline] = React.useState([]);

    const fetchRoomDetails = React.useCallback(() => {
        const URL = `/device/get-in-use`;
        httpRequest
            .get(URL)
            .then((response) => {
                console.log(response.data);
                const sortedData = response.data.sort((a, b) => a.Device.serial.localeCompare(b.Device.serial));
                setRoomDetail(sortedData);
            })
            .catch((error) => {
                console.error('Error fetching room detail:', error);
            });
    }, []);

    const fetchOnline = React.useCallback(() => {
        const URL = `/device/check-online`;
        httpRequest
            .get(URL)
            .then((response) => {
                console.log(response.data);
                setOnline(Array.isArray(response.data.data) ? response.data.data : []);
            })
            .catch((error) => {
                console.error('Error fetching online status:', error);
            });
    }, []);

    React.useEffect(() => {
        fetchRoomDetails();
        fetchOnline();
    }, [fetchRoomDetails, fetchOnline]);

    const mergeData = React.useMemo(() => {
        return roomDetail.map((device) => {
            const isOnline = online.some((onlineDevice) => onlineDevice.serial === device.Device.serial);
            return {
                ...device,
                online: isOnline ? 'Online' : 'Offline',
            };
        });
    }, [roomDetail, online]);

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
            {
                Header: 'Trạng thái online',
                accessor: 'online',
                Cell: ({ value }) => <span className={value === 'Online' ? 'online' : 'offline'}>{value}</span>,
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
            data: mergeData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination,
    );

    return (
        <div className="App py-5">
            <div className="container">
                <h1>Danh sách thiết bị đang được sử dụng</h1>
                <h4>
                    *Ghi chú : Thiết bị <span className="bold-text">Online</span> là thiết bị{' '}
                    <span className="bold-text">có khả năng kết nối mạng </span>
                    để gửi dữ liệu lên hệ thống
                </h4>
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
