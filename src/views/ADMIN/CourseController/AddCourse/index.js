import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import './AddCourse.scss';

function AddCourse() {
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();
    const [lessonCount, setLessonCount] = useState(1);

    const addLessonItem = () => {
        setLessonCount(lessonCount + 1);
    };

    const deleteLessonItem = () => {
        setLessonCount(lessonCount - 1);
    };

    const onSubmit = (data) => {
        console.log(data); // Thực hiện xử lý dữ liệu khi form được gửi đi
    };

    return (
        <div className="container py-5 add-course-content">
            <div className="content">
                <h1>ADD COURSE</h1>
                <form className="form-box form-add-course" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <h3 className="mt-3">Course information</h3>
                        <div className="form-group add-course  col-xl-6 col-lg-6 col-md-6 ">
                            <label className="option-course">Course name</label>
                            <textarea
                                className="form-control mt-1 form-comment-control"
                                placeholder="Course's name"
                                {...register('name', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                        <div className="form-group add-course col-xl-6 col-lg-6 col-md-6">
                            <label className="option-course">Course Serial</label>
                            <textarea
                                className="form-control mt-1 form-comment-control"
                                placeholder="Course's serial"
                                {...register('serial', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                        <div className="form-group add-course mt-3 col-xl-12 col-lg-12">
                            <label className="option-course">Course Description</label>
                            <textarea
                                className="form-control mt-1 form-comment-control"
                                placeholder="Course's description"
                                {...register('abtrac', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                        <div className="form-group add-course mt-3 col-xl-6 col-lg-6 col-md-6">
                            <label className="option-course">Author</label>
                            <textarea
                                className="form-control mt-1 form-comment-control "
                                placeholder="Author"
                                {...register('author', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                        <div className="form-group add-course mt-3 col-xl-6 col-lg-6 col-md-6">
                            <label className="option-course">Price</label>
                            <textarea
                                className="form-control mt-1 "
                                placeholder="Price"
                                {...register('price', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                        <div className="form-group add-course mt-3 col-xl-6 col-lg-6 col-md-6">
                            <label className="option-course">Course Image</label>
                            <input
                                className="form-control mt-1 "
                                placeholder="Course's image"
                                type="file"
                                {...register('imgUrl', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                    </div>
                    <br />
                    <br />

                    <h3>Lessons information</h3>
                    {Array.from({ length: lessonCount }, (_, index) => (
                        <div className="lesson-item mt-3" key={index}>
                            <div className="lesson-detail-header d-flex">
                                <h4>Lesson : #{index + 1}</h4>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-option-lesson btn-delete"
                                    onClick={deleteLessonItem}
                                >
                                    X
                                </button>
                            </div>
                            <Controller
                                name={`lessons[${index}].title`}
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Please enter complete information!' }}
                                render={({ field }) => (
                                    <div className="form-group add-course mt-3">
                                        <label className="option-course">Lesson title</label>
                                        <textarea
                                            className="form-control mt-1 form-comment-control"
                                            placeholder="Lesson's title"
                                            {...field}
                                        />
                                    </div>
                                )}
                            />
                            <Controller
                                name={`lessons[${index}].description`}
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Please enter complete information!' }}
                                render={({ field }) => (
                                    <div className="form-group add-course mt-3">
                                        <label className="option-course">Lesson Description</label>
                                        <textarea
                                            className="form-control mt-1 form-comment-control"
                                            placeholder="Lesson's description"
                                            {...field}
                                        />
                                    </div>
                                )}
                            />
                            <Controller
                                name={`lessons[${index}].mediaUrl`}
                                control={control}
                                defaultValue=""
                                rules={{ required: 'Please enter complete information!' }}
                                render={({ field }) => (
                                    <div className="form-group add-course mt-3">
                                        <label className="option-course">Media URL</label>
                                        <textarea className="form-control mt-1" placeholder="Media URL" {...field} />
                                    </div>
                                )}
                            />
                        </div>
                    ))}

                    <div className="d-grid gap-2 mt-1">
                        <div className="row">
                            <div className="col-xl-6 col-md-6 mt-2">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-option-lesson"
                                    onClick={addLessonItem}
                                >
                                    Add lesson
                                </button>
                            </div>
                            <div className="col-xl-6 col-md-6 mt-2">
                                <button
                                    type="button"
                                    className="btn btn-primary btn-option-lesson"
                                    onClick={deleteLessonItem}
                                >
                                    Delete lesson
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;
