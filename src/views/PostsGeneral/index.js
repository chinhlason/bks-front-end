import './PostsGeneral.scss';

function PostsGeneral() {
    return (
        <div className="container py-5">
            <h1> Some interesting posts </h1>
            <div className="category d-flex mt-3">
                <a href="#" className="category-detail active">
                    All
                </a>
                <a href="#" className="category-detail">
                    Bullshit
                </a>
            </div>
            <div className="post-item">
                <div className="row">
                    <div className="col-xl-8 col-md-6 post-content">
                        <h3>How can i get a job when i 16? i dont know, this is a question!</h3>

                        <h6 className="author">Author : Son Ngo, Created at : 16/10/2023</h6>
                        <p>Absolutely i am lying, so dont be so serious! keke...</p>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div
                            className="post-img "
                            style={{
                                backgroundImage:
                                    'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="post-item">
                <div className="row">
                    <div className="col-xl-8 col-md-6 post-content">
                        <h3>How can i get a job when i 16? i dont know, this is a question!</h3>

                        <h6 className="author">Author : Son Ngo, Created at : 16/10/2023</h6>
                        <p>Absolutely i am lying, so dont be so serious! keke...</p>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div
                            className="post-img "
                            style={{
                                backgroundImage:
                                    'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <div>Pagination Container here</div>
        </div>
    );
}

export default PostsGeneral;
