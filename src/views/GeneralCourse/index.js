import './GeneralCourse.scss';
import ReactPaginate from 'https://cdn.skypack.dev/react-paginate@7.1.3';
import React, { useEffect, useState } from 'react';
import { ReactDOM } from 'react';

const items = [1, 2, 3, 4]; //example pagination
function Items({ currentItems }) {
    return (
        <div className="items">
            {currentItems &&
                currentItems.map((item) => (
                    <div>
                        <h3>Item #{item}</h3>
                    </div>
                ))}
        </div>
    );
}
function GeneralCourse({ itemsPerPage }) {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };
    return (
        <div className="container">
            <div className="row py-5">
                <h1> Type of course </h1>
                <div className="row">
                    <div className="col-xl-4 col-12 col-sm-6 mt-4 ">
                        <div class="card ">
                            <div
                                className="course-image"
                                style={{
                                    backgroundImage:
                                        'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                                }}
                            ></div>
                            <div class="card-body">
                                <h5 class="card-title">Name course</h5>
                                <p class="card-text">100.000 Dong</p>
                                <a href="#" class="btn btn-primary">
                                    Lets checking out
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-12 col-sm-6 mt-4 ">
                        <div class="card ">
                            <div
                                className="course-image"
                                style={{
                                    backgroundImage:
                                        'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                                }}
                            ></div>
                            <div class="card-body">
                                <h5 class="card-title">Name course</h5>
                                <p class="card-text">100.000 Dong</p>
                                <a href="#" class="btn btn-primary">
                                    Lets checking out
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-12 col-sm-6 mt-4 ">
                        <div class="card ">
                            <div
                                className="course-image"
                                style={{
                                    backgroundImage:
                                        'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                                }}
                            ></div>
                            <div class="card-body">
                                <h5 class="card-title">Name course</h5>
                                <p class="card-text">100.000 Dong</p>
                                <a href="#" class="btn btn-primary">
                                    Lets checking out
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-12 col-sm-6 mt-4 ">
                        <div class="card ">
                            <div
                                className="course-image"
                                style={{
                                    backgroundImage:
                                        'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                                }}
                            ></div>
                            <div class="card-body">
                                <h5 class="card-title">Name course</h5>
                                <p class="card-text">100.000 Dong</p>
                                <a href="#" class="btn btn-primary">
                                    Lets checking out
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-12 col-sm-6 mt-4 ">
                        <div class="card ">
                            <div
                                className="course-image"
                                style={{
                                    backgroundImage:
                                        'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                                }}
                            ></div>
                            <div class="card-body">
                                <h5 class="card-title">Name course</h5>
                                <p class="card-text">100.000 Dong</p>
                                <a href="#" class="btn btn-primary">
                                    Lets checking out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <>
                    <Items currentItems={currentItems} />
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </>
            </div>
        </div>
    );
}

export default GeneralCourse;
