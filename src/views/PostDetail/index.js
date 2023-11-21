import './PostDetail.scss';
import { useForm, Controller } from 'react-hook-form';
function PostDetail() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();
    return (
        <div className="container ">
            <div className="post-detail">
                <h1>
                    Bootstrap is a powerful, feature-packed frontend toolkit. Build anything—from prototype to
                    production—in minutes.
                </h1>
                <h6 className="author">Author : Son Ngo, at : 23/12/2023</h6>
                <p className="content">
                    Curious which components explicitly require our JavaScript and Popper? If you’re at all unsure about
                    the general page structure, keep reading for an example page template. Alerts for dismissing Buttons
                    for toggling states and checkbox/radio functionality Carousel for all slide behaviors, controls, and
                    indicators Collapse for toggling visibility of content Dropdowns for displaying and positioning
                    (also requires Popper) Modals for displaying, positioning, and scroll behavior Navbar for extending
                    our Collapse and Offcanvas plugins to implement responsive behaviors Navs with the Tab plugin for
                    toggling content panes Offcanvases for displaying, positioning, and scroll behavior Scrollspy for
                    scroll behavior and navigation updates Toasts for displaying and dismissing Tooltips and popovers
                    for displaying and positioning (also requires Popper)
                    <br />
                    Curious which components explicitly require our JavaScript and Popper? If you’re at all unsure about
                    the general page structure, keep reading for an example page template. Alerts for dismissing Buttons
                    for toggling states and checkbox/radio functionality Carousel for all slide behaviors, controls, and
                    indicators Collapse for toggling visibility of content Dropdowns for displaying and positioning
                    (also requires Popper) Modals for displaying, positioning, and scroll behavior Navbar for extending
                    our Collapse and Offcanvas plugins to implement responsive behaviors Navs with the Tab plugin for
                    toggling content panes Offcanvases for displaying, positioning, and scroll behavior Scrollspy for
                    scroll behavior and navigation updates Toasts for displaying and dismissing Tooltips and popovers
                    for displaying and positioning (also requires Popper)
                    <br />
                    Curious which components explicitly require our JavaScript and Popper? If you’re at all unsure about
                    the general page structure, keep reading for an example page template. Alerts for dismissing Buttons
                    for toggling states and checkbox/radio functionality Carousel for all slide behaviors, controls, and
                    indicators Collapse for toggling visibility of content Dropdowns for displaying and positioning
                    (also requires Popper) Modals for displaying, positioning, and scroll behavior Navbar for extending
                    our Collapse and Offcanvas plugins to implement responsive behaviors Navs with the Tab plugin for
                    toggling content panes Offcanvases for displaying, positioning, and scroll behavior Scrollspy for
                    scroll behavior and navigation updates Toasts for displaying and dismissing Tooltips and popovers
                    for displaying and positioning (also requires Popper)
                    <br />
                    Curious which components explicitly require our JavaScript and Popper? If you’re at all unsure about
                    the general page structure, keep reading for an example page template. Alerts for dismissing Buttons
                    for toggling states and checkbox/radio functionality Carousel for all slide behaviors, controls, and
                    indicators Collapse for toggling visibility of content Dropdowns for displaying and positioning
                    (also requires Popper) Modals for displaying, positioning, and scroll behavior Navbar for extending
                    our Collapse and Offcanvas plugins to implement responsive behaviors Navs with the Tab plugin for
                    toggling content panes Offcanvases for displaying, positioning, and scroll behavior Scrollspy for
                    scroll behavior and navigation updates Toasts for displaying and dismissing Tooltips and popovers
                    for displaying and positioning (also requires Popper)
                </p>

                <div className="comments">
                    <h4>Comments</h4>
                    <div className="comments-box">
                        <div className="comment">
                            <h5 className="user-comment">user</h5>
                            <div className="content-comment">
                                Curious which components explicitly require our JavaScript and Popper? If you’re at all
                                unsure about the general page structure, keep reading for an example page template
                            </div>
                        </div>
                        <div className="comment">
                            <h5 className="user-comment">user</h5>
                            <div className="content-comment">
                                Curious which components explicitly require our JavaScript and Popper? If you’re at all
                                unsure about the general page structure, keep reading for an example page template
                            </div>
                        </div>
                    </div>

                    <div className="comment-form">
                        <form className="commening row">
                            <h3>Your comment</h3>
                            <div className="form-group mt-3 col-xl-10 col-md-8">
                                <textarea
                                    className="form-control mt-1 form-comment-control"
                                    placeholder="Comment"
                                    {...register('comment', {
                                        required: 'Please enter complete information!',
                                    })}
                                />
                            </div>

                            <div className="d-grid gap-2 mt-3 col-xl-2 col-md-4">
                                <button type="submit" className="btn btn-primary btn-send">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
