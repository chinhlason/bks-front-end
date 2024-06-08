import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTable, usePagination } from 'react-table';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import httpRequest from '~/util/httpRequest';
import { MDBBtn } from 'mdb-react-ui-kit';

function HomeAdmin() {
    const [rooms, setRooms] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const navigate = useNavigate();

    const fetchData = () => {
        httpRequest
            .get('/room/get-all-by-admin')
            .then((response) => {
                if (response.data == null || response.data.length === 0) {
                    console.log('No data received');
                    return;
                }
                const sortedRooms = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setRooms(sortedRooms);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
            });
    };

    const fetchSearchResults = (value) => {
        setIsSearching(true);
        httpRequest
            .get(`/room/search-admin?q=${value}`)
            .then((response) => {
                const sortedRooms = response.data.sort((a, b) => a.name.localeCompare(b.name));
                setRooms(sortedRooms);
                setIsSearching(false);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setRooms([]);
                setIsSearching(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedFetchSearchResults = useCallback(debounce(fetchSearchResults, 1000), []);

    useEffect(() => {
        if (searchValue) {
            debouncedFetchSearchResults(searchValue);
        } else {
            fetchData();
        }
    }, [searchValue]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        fetchSearchResults(searchValue);
    };

    const data = useMemo(() => rooms, [rooms]);
    const columns = useMemo(
        () => [
            {
                Header: 'Tên phòng',
                accessor: 'name',
            },
            {
                Header: 'Bác sĩ phụ trách',
                accessor: 'Doctor',
                Cell: ({ cell: { value } }) => `${value.doctor_code} - ${value.fullname}`,
            },
            {
                Header: 'Số lượng bệnh nhân',
                accessor: 'patient_number',
            },
            {
                Header: 'Số lượng giường bệnh',
                accessor: 'bed_number',
            },
            {
                Header: 'Hành động',
                Cell: ({ row }) => (
                    <button onClick={() => handleRoomDetail(row.original.name)} className="btn btn-primary">
                        Xem chi tiết
                    </button>
                ),
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
            initialState: { pageIndex: 0, pageSize: 5 }, // Start with page index 0 and page size of 6
        },
        usePagination,
    );

    const handleRoomDetail = (roomName) => {
        navigate(`/room-admin?name=${roomName}`);
    };

    return (
        <div className="container">
            <div className="row py-5">
                <h1>Danh sách phòng bệnh ({rooms.length})</h1>
                <MDBBtn onClick={() => navigate('/add-room')} className="btn btn-primary mt-3 col-md-3 ">
                    Thêm phòng bệnh
                </MDBBtn>

                {isSearching ? (
                    <p>Đang tìm kiếm...</p>
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
                                        <tr {...row.getRowProps()} style={{ cursor: 'pointer' }}>
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
                            <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
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

export default HomeAdmin;
