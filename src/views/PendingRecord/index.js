// Import React and other necessary modules
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useTable, useSortBy, usePagination } from 'react-table';
import '@fortawesome/fontawesome-free/css/all.min.css';

function PendingRecord() {
    const navigate = useNavigate();
    const [pendingRecords, setPendingRecords] = React.useState([]);

    // Fetch pending records from the API on component mount
    React.useEffect(() => {
        axios
            .get('http://localhost:8081/record/get-all-pending', { withCredentials: true })
            .then((response) => {
                if (response.data == null) {
                    setPendingRecords([]); // Set state to an empty array in case of an error
                } else {
                    setPendingRecords(response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching pending records:', error);
                setPendingRecords([]); // Set state to an empty array in case of an error
            });
    }, []);

    const handleRowClick = (recordId) => {
        console.log('Row clicked with ID:', recordId);
        navigate(`/patient?id=${recordId}`);
    };

    const data = React.useMemo(() => pendingRecords, [pendingRecords]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'STT',
                Cell: ({ row }) => row.index + 1,
            },
            {
                Header: 'Mã bệnh nhân',
                accessor: 'PatientCode',
            },
            {
                Header: 'Tên bệnh nhân',
                accessor: 'Fullname',
            },
            {
                Header: 'Điện thoại',
                accessor: 'Phone',
            },
            {
                Header: 'Thông tin thêm',
                accessor: 'Detail',
            },
            {
                Header: 'Ngày nhập viện',
                accessor: 'CreateAt',
                Cell: ({ value }) => new Date(value).toLocaleDateString('vi-VN'),
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
                <h2>Danh sách bệnh nhân chờ</h2>
                <MDBBtn
                    onClick={() => {
                        navigate('/add-patient');
                    }}
                >
                    Thêm bệnh nhân
                </MDBBtn>
                {pendingRecords.length === 0 ? (
                    <p>Không có bệnh nhân chờ.</p>
                ) : (
                    <>
                        <table {...getTableProps()} className="table mt-3">
                            <thead>
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className={
                                                    column.isSorted
                                                        ? column.isSortedDesc
                                                            ? 'sorted-desc'
                                                            : 'sorted-asc'
                                                        : ''
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
                                            onClick={() => handleRowClick(row.original.Id)}
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
                    </>
                )}
            </div>
        </div>
    );
}

export default PendingRecord;
