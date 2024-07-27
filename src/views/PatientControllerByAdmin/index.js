import * as React from 'react';
import { useTable, usePagination } from 'react-table';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import httpRequest from '~/util/httpRequest';
import moment from 'moment';
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

function PatientControllerByAdmin() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [devices, setDevices] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [filterStatus, setFilterStatus] = React.useState(''); // New state for filter value
    const queryParameters = new URLSearchParams(window.location.search);
    const patient = queryParameters.get('patient');
    const id = queryParameters.get('id');
    const nav = useNavigate();

    const fetchData = (status = '') => {
        httpRequest
            .get('/record/get-all-total-admin')
            .then((response) => {
                let filteredData = response.data;

                if (status) {
                    filteredData = filteredData.filter((item) => item.Status === status);
                }

                const sortedData = filteredData.sort((a, b) => {
                    const nameA = a.Fullname.toUpperCase(); // Chuyển tên thành chữ hoa để so sánh
                    const nameB = b.Fullname.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

                setDevices(sortedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setDevices([]);
            });
    };

    const fetchSearchResults = (value, status = '') => {
        setIsSearching(true);
        const url = `/record/search-admin?q=${value}`;
        httpRequest
            .get(url)
            .then((response) => {
                const sortedData = response.data.sort((a, b) => {
                    const nameA = a.Fullname.toUpperCase();
                    const nameB = b.Fullname.toUpperCase();

                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });

                setDevices(sortedData);
                setIsSearching(false);
            })
            .catch((error) => {
                console.error('Error fetching search results:', error);
                setDevices([]);
                setIsSearching(false);
            });
    };

    React.useEffect(() => {
        fetchData(filterStatus);
    }, [filterStatus]);

    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const debouncedFetchSearchResults = React.useCallback(debounce(fetchSearchResults, 1000), []);

    React.useEffect(() => {
        if (searchValue) {
            debouncedFetchSearchResults(searchValue, filterStatus);
        } else {
            fetchData(filterStatus);
        }
    }, [searchValue, filterStatus]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchClick = () => {
        fetchSearchResults(searchValue, filterStatus);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const data = React.useMemo(() => devices, [devices]);
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
                Header: 'Địa chỉ',
                accessor: 'Address',
            },
            {
                Header: 'Liên lạc',
                accessor: 'Phone',
            },
            {
                Header: 'Trạng thái',
                accessor: 'Status',
            },
            {
                Header: 'Thông tin thêm',
                accessor: 'More',
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

    const handleChooseRow = (id) => {
        nav(`/patient?id=${id}`);
    };

    return (
        <div className="App py-5">
            <div className="container">
                <h1>Danh sách bệnh nhân thuộc quản lý của bác sĩ</h1>
                <div className="row">
                    <div className="col-md-9">
                        <MDBInputGroup className="mt-3 mb-3 ">
                            <MDBInput
                                id="search"
                                label="Tìm kiếm bệnh nhân"
                                value={searchValue}
                                onChange={handleSearchChange}
                            />
                            <MDBBtn rippleColor="dark" onClick={handleSearchClick}>
                                <MDBIcon icon="search" />
                            </MDBBtn>
                        </MDBInputGroup>
                    </div>
                    <div className="filter-option col-md-2">
                        <select className="form-control " value={filterStatus} onChange={handleFilterChange}>
                            <option value="">Tất cả trạng thái</option>
                            <option value="TREATING">TREATING</option>
                            <option value="LEAVED">LEAVED</option>
                            <option value="PENDING">PENDING</option>
                        </select>
                    </div>
                </div>
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
                                        <tr
                                            {...row.getRowProps()}
                                            onClick={() => handleChooseRow(row.original.Id)}
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

export default PatientControllerByAdmin;
