import './RoomDetail.scss';
import * as React from 'react';
import { useTable } from 'react-table';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';

function RoomDetail() {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const roomName = queryParameters.get('name');
    const [selectedIdRecord, setSelectedIdRecord] = React.useState(null); // State to store the selected IdRecord
    const [roomDetail, setRoomDetail] = React.useState([]);
    const [page, setPage] = React.useState(1); // State to track the current page
    const [pageSize, setPageSize] = React.useState(10); // State to track the page size
    const [maxPage, setMaxPage] = React.useState(1); // State to track the total number of pages
    const [roomDetailAdmin, setRoomDetailAdmin] = React.useState({});

    const fetchRoomDetails = React.useCallback(() => {
        if (roomName) {
            const URL = `room/get-detail-pagi?room=${roomName}&page=${page}&size=${pageSize}`;
            httpRequest
                .get(URL)
                .then((response) => {
                    console.log(response.data.Data);
                    // Sort the array based on the condition Id is not null first, then sort by patient name
                    const sortedData = response.data.Data.sort((a, b) => {
                        if (a.IdRecord && !b.IdRecord) {
                            return -1;
                        }
                        if (!a.IdRecord && b.IdRecord) {
                            return 1;
                        }
                        if (a.PatientName < b.PatientName) {
                            return -1;
                        }
                        if (a.PatientName > b.PatientName) {
                            return 1;
                        }
                        return 0;
                    });
                    setRoomDetail(sortedData);
                    setMaxPage(response.data.Message); // Update maxPage from response
                })
                .catch((error) => {
                    console.error('Error fetching room detail:', error);
                });
        }
    }, [roomName, page, pageSize]);
    const fetchRoomDetailsAdmin = React.useCallback(() => {
        if (roomName) {
            const URL = `/room/get-admin?room=${roomName}`;
            httpRequest
                .get(URL)
                .then((response) => {
                    const sortedData = response.data.Members.sort((a, b) => {
                        if (a.fullname < b.fullname) {
                            return -1;
                        }
                        if (a.fullname > b.fullname) {
                            return 1;
                        }
                        return 0;
                    });
                    setRoomDetailAdmin(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching room detail:', error);
                });
        }
    }, []);
    React.useEffect(() => {
        fetchRoomDetails();
        fetchRoomDetailsAdmin();
    }, [fetchRoomDetails]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                Cell: ({ row }) => (page - 1) * pageSize + row.index + 1,
            },
            {
                Header: 'Mã bệnh nhân',
                accessor: 'PatientCode',
            },
            {
                Header: 'Tên bệnh nhân',
                accessor: 'PatientName',
            },
            {
                Header: 'Tên giường',
                accessor: 'BedName',
            },
            {
                Header: 'Serial thiết bị',
                accessor: 'DeviceSerial',
            },
            {
                Header: 'Trạng thái giường',
                accessor: 'BedStt',
            },
            {
                Header: 'Liên lạc',
                accessor: 'Contact',
            },
            {
                Header: 'Thông tin thêm',
                accessor: 'More',
            },
        ],
        [page, pageSize],
    );

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: roomDetail,
    });

    const handleRowClick = (row) => {
        if (row.original.BedStt === 'AVAILABLE') {
            return; // If BedStt is AVAILABLE, do not perform any action
        }

        setSelectedIdRecord(row.original.IdRecord);
        navigate(`/patient?id=${row.original.IdRecord}`);
    };

    const handleNextPage = () => {
        if (page < maxPage) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <div className="App py-5">
            <div className="container">
                <h1>Chi tiết phòng bệnh {roomName}</h1>

                <div className="row mt-3 mb-3">
                    <div className="col-md-5">
                        <h4>
                            Bác sĩ phụ trách : {roomDetailAdmin.Leader?.doctor_code} -{' '}
                            {roomDetailAdmin.Leader?.fullname}
                        </h4>
                        <h5>Số lượng bệnh nhân : {roomDetailAdmin.PatientNumber}</h5>
                        <h5>Số lượng giường bệnh : {roomDetailAdmin.BedNumber}</h5>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-7">
                                <h4>Danh sách bác sĩ trong phòng bệnh ({roomDetailAdmin.Members?.length})</h4>

                                <div className="member-box">
                                    {roomDetailAdmin.Members?.map((member, index) => (
                                        <div key={index} className="note-element-2 member-element row">
                                            <div
                                                onClick={() => {
                                                    navigate(`/profile-admin?id=${roomDetailAdmin.Members[index].id}`);
                                                }}
                                                className="col-md-12 member-line text-line"
                                            >
                                                {member.fullname} - {member.doctor_code}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MDBBtn
                    onClick={() => {
                        navigate('/pending-record');
                    }}
                >
                    Danh sách bệnh nhân chờ
                </MDBBtn>
                <MDBBtn
                    onClick={() => {
                        navigate('/add-bed');
                    }}
                    className="ml-2"
                >
                    Thêm giường bệnh
                </MDBBtn>
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
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    onClick={() => handleRowClick(row)}
                                    className={selectedIdRecord === row.original.IdRecord ? 'selected-row' : ''}
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
                    <MDBBtn onClick={() => setPage(1)} disabled={page === 1}>
                        Trang đầu
                    </MDBBtn>
                    <MDBBtn onClick={handlePreviousPage} disabled={page === 1}>
                        Trang trước
                    </MDBBtn>
                    <span>
                        Trang {page} / {maxPage}
                    </span>
                    <MDBBtn onClick={handleNextPage} disabled={page == maxPage}>
                        Trang sau
                    </MDBBtn>
                    <MDBBtn onClick={() => setPage(maxPage)} disabled={page == maxPage}>
                        Trang cuối
                    </MDBBtn>
                    <span>
                        | Tới trang:{' '}
                        <input
                            type="number"
                            defaultValue={page}
                            onChange={(e) => {
                                const newPage = e.target.value ? Number(e.target.value) : 1;
                                setPage(newPage);
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                    <select
                        value={pageSize}
                        onChange={(e) => {
                            setPageSize(Number(e.target.value));
                            setPage(1); // Reset to first page when page size changes
                        }}
                    >
                        {[5, 10, 20, 30, 40].map((size) => (
                            <option key={size} value={size}>
                                Hiển thị {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default RoomDetail;
