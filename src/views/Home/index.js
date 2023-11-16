import './Home.scss';
function Home() {
    return (
        <div className="wrapper">
            <div id="carouselRide" className="carousel slide" data-bs-ride="true">
                <div className="carousel-inner">
                    <div class="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselRide"
                            data-bs-slide-to="0"
                            class="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselRide"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselRide"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-item active">
                        <div
                            className="overlay-image"
                            style={{
                                backgroundImage:
                                    'url(https://storage.googleapis.com/hust-files/2021-11-15/5807675312963584/background-new-page_.9m.jpeg)',
                            }}
                        ></div>
                        <div className="carousel-caption text-start">
                            <h1>Sign up now</h1>
                            <p>Just do it now, your turn</p>
                            <a href="#" className="btn btn-lg btn-primary">
                                Sign up now
                            </a>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="overlay-image"
                            style={{
                                backgroundImage:
                                    'url(https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg)',
                            }}
                        ></div>
                        <div className="carousel-caption text-start">
                            <h1>Sign up now</h1>
                            <p>Just do it now, your turn</p>
                            <a href="#" className="btn btn-lg btn-primary">
                                Sign in now
                            </a>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="overlay-image"
                            style={{
                                backgroundImage:
                                    'url(https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D)',
                            }}
                        ></div>
                        <div className="carousel-caption text-start">
                            <h1>Sign up now</h1>
                            <p>Just do it now, your turn</p>
                            <a href="#" className="btn btn-lg btn-primary">
                                Sign out now
                            </a>
                        </div>
                    </div>
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselRide"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselRide"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container marketing">
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h1 className="featurette-heading"> WOW </h1>
                        <p className="lead">
                            Another featurette? Of course. More placeholder content here to give you an idea of how this
                            layout would work with some actual real-world content in place.
                        </p>
                    </div>
                    <div className="img-featute col-md-5 order-md-1">
                        <svg
                            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                            width="500"
                            height="500"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: 500x500"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <title>Placeholder</title>
                            <image
                                href="https://i.pinimg.com/564x/8e/a2/31/8ea2311dcf8f6e35628a3ee431e581d2.jpg"
                                width="500"
                                height="500"
                            />
                        </svg>
                    </div>
                </div>
                <hr class="featurette-divider"></hr>
                <div className="row featurette">
                    <div className="col-md-7">
                        <h1 className="featurette-heading"> WOW </h1>
                        <p className="lead">
                            Another featurette? Of course. More placeholder content here to give you an idea of how this
                            layout would work with some actual real-world content in place.
                        </p>
                    </div>
                    <div className="img-featute col-md-5">
                        <svg
                            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                            width="500"
                            height="500"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: 500x500"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <title>Placeholder</title>
                            <image
                                href="https://i.pinimg.com/564x/8e/a2/31/8ea2311dcf8f6e35628a3ee431e581d2.jpg"
                                width="500"
                                height="500"
                            />
                        </svg>
                    </div>
                </div>
                <hr class="featurette-divider"></hr>
                <div className="row featurette">
                    <div className="col-md-7 order-md-2">
                        <h1 className="featurette-heading"> WOW </h1>
                        <p className="lead">
                            Another featurette? Of course. More placeholder content here to give you an idea of how this
                            layout would work with some actual real-world content in place.
                        </p>
                    </div>
                    <div className="img-featute col-md-5 order-md-1">
                        <svg
                            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
                            width="500"
                            height="500"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label="Placeholder: 500x500"
                            preserveAspectRatio="xMidYMid slice"
                            focusable="false"
                        >
                            <title>Placeholder</title>
                            <image
                                href="https://i.pinimg.com/564x/8e/a2/31/8ea2311dcf8f6e35628a3ee431e581d2.jpg"
                                width="500"
                                height="500"
                            />
                        </svg>
                    </div>
                </div>
                <hr class="featurette-divider"></hr>
                "If you want to know, you need to know" - Pablo Bicasso!
            </div>
        </div>
    );
}

export default Home;
