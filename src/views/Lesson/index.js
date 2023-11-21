import './Lesson.scss';
function Lesson() {
    return (
        <div className="container">
            <div className="row py-5">
                <div className="col-xl-9 col-md-12 col-lg-9 col-sm-12">
                    <div className="video-thum ">
                        <div className="lesson-header d-flex">
                            <h5>Lesson 1 How to create a secret lesson with fire</h5>
                            <button className="btn btn-primary btn-process">Mark/Unmark</button>
                        </div>

                        <iframe
                            className="video"
                            frameborder="0"
                            allowfullscreen=""
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            title="ReactJS là gì? Tại sao nên học ReactJS?"
                            // width="100%"
                            // height="100%"
                            src="https://www.youtube.com/embed/R52pgsbROn4?si=R71602NtiwWUGxFU"
                            id="widget2"
                        ></iframe>
                        <div className="lesson-description mt-3">
                            <h5>Lesson description</h5>
                            <p className="lesson-description-content">
                                src="https://www.youtube.com/embed/R52pgsbROn4?si=R71602NtiwWUGxFU"
                                id="widget2"src="https://www.youtube.com/embed/R52pgsbROn4?si=R71602NtiwWUGxFU"
                                id="widget2"src="https://www.youtube.com/embed/R52pgsbROn4?si=R71602NtiwWUGxFU"
                                id="widget2"src="https://www.youtube.com/embed/R52pgsbROn4?si=R71602NtiwWUGxFU"
                                id="widget2"src="https://www.youtube.com/embed/R52pgsbROn4?si=R71602NtiwWUGxFU"
                                id="widget2"
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3">
                    <div className="lesson-sidebar">
                        <h4>Lessons list</h4>
                        <div className="lesson-element active">Lesson 1 How to create a secret lesson with fire</div>
                        <div className="lesson-element">Lesson 1 How to create a secret lesson with fire</div>
                        <div className="lesson-element">Lesson 3</div>
                        <div className="lesson-element">Lesson 4</div>
                        <div className="lesson-element">Lesson 5</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Lesson;
