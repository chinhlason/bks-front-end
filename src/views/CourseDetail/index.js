import './CourseDetail.scss';
import CourseIMG from '~/assets/img/course1.jpg';
function CourseDetail() {
    return (
        <div className="container py-5">
            <div className="row course-detail">
                <div className="img-featute col-md-5 mt-4 course-detail-item">
                    <img className="course-image-detail" src={CourseIMG} alt="QR Code" />
                </div>
                <div className="col-md-7 mt-3 course-description course-detail-item">
                    <h1 className="course-heading"> Java JavaScript HTML CSS Course </h1>
                    <h5 className="author">Author : Son ngo</h5>

                    <p className="lead">
                        Another featurette? Of course. More placeholder content here to give you an idea of how this
                        layout would work with some actual real-world content in place.
                        <br />
                        This course have 3 videos with over 8hrs
                        <br />
                        And you guys will become master in this major
                    </p>

                    <h2 className="price"> 100000 Dong</h2>
                    <a href="#" class="btn btn-primary btn-buy mt-3">
                        Buy now
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
