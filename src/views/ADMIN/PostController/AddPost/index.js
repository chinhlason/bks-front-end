import { useState } from 'react';
import './AddPost.scss';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function AddPost() {
    const [value, setValue] = useState('');
    const {
        handleSubmit,
        control,
        register,
        formState: { errors },
    } = useForm();
    return (
        <div className="container py-5 add-course-content ">
            <div className="content">
                <h1> ADD POST</h1>
                <form className="form-box form-add-course">
                    <div className="row">
                        <div className="form-group add-course  col-xl-6 col-lg-6 col-md-6 ">
                            <label className="option-course">Post title</label>
                            <textarea
                                className="form-control mt-1 form-comment-control"
                                placeholder="Post's title"
                                {...register('title ', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>

                        <div className="form-group add-course  col-xl-6 col-lg-6 col-md-6 ">
                            <label className="option-course">Post category</label>
                            <textarea
                                className="form-control mt-1 form-comment-control"
                                placeholder="Post's category"
                                {...register('category', {
                                    required: 'Please enter complete information!',
                                })}
                            />
                        </div>
                    </div>
                    <ReactQuill
                        className="post-box-input mt-3 custom-quill-editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                    <button type="submit" className="btn btn-primary mt-3">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddPost;
