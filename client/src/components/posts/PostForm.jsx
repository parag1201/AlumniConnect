import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { createPost, createPostRequest } from "../../actions/post";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import { setAlert } from "../../actions/alert";
import axios from "axios";

const PostForm = ({
	createPost,
	setAlert,
	createPostRequest,
	history,
	post: {
		settings: { requireApproval },
	},
}) => {
	const [text, setText] = useState("");
	const [heading, setHeading] = useState("");
	const [visibleStudent, setVisibleStudent] = useState(false);
	const [visibleFaculty, setVisibleProf] = useState(false);
	const [visibleAlumni, setVisibleAlumni] = useState(false);
	const [image, setImage] = useState({ preview: "", data: "" });
	const [status, setStatus] = useState("");

	const handleFileChange = (e) => {
		const img = {
			preview: URL.createObjectURL(e.target.files[0]),
			data: e.target.files[0],
		};
		setImage(img);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (
			visibleAlumni === false &&
			visibleFaculty === false &&
			visibleStudent === false
		) {
			setAlert("Please check atleast one checkbox", "danger");
		} else {
			let formData = new FormData();
			formData.append("file", image.data);
			const res = await axios.post("/image", formData);
			const newFileName = res.data;
			var imagesArray = [];
			imagesArray.push(newFileName);
			// if (response) setStatus(response.statusText);
			let success = 0;

			if (requireApproval) {
				success = await createPostRequest({
					text,
					heading,
					visibleStudent,
					visibleFaculty,
					visibleAlumni,
					imagesArray,
				});
			} else {
				success = await createPost({
					text,
					heading,
					visibleStudent,
					visibleFaculty,
					visibleAlumni,
					imagesArray,
				});
			}

			// if (success) {
			// 	setTimeout(() => {
			// 		history.push("/feed");
			// 	}, 1500);
			// } else {
			// }
		}
	};

	return (
		<React.Fragment>
			<div className="container post-form-container">
				<div className="form-header">
					<h1 className="large text-primary">Write a post</h1>
					<small style={{ color: "red" }}>* = required field</small>
				</div>
				<form className="form" onSubmit={(e) => onSubmit(e)}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Topic/Heading"
							name="heading"
							value={heading}
							onChange={(e) => setHeading(e.target.value)}
							required
						/>
					</div>
					<div className="form-group">
						<CKEditor
							editor={ClassicEditor}
							data={text}
							onChange={(event, editor) => {
								const data = editor.getData();
								setText(data);
							}}
							required
						/>
					</div>
					<div className="form-group">
						<label>Upload images (.png, .jpg, .jpeg)</label>
						<input
							type="file"
							name="multi-files"
							id="multi-files"
							multiple
							onChange={handleFileChange}
						/>
					</div>

					<div className="form-group select-post-visibility">
						<p
							style={{ fontSize: "1.2rem" }}
							className="secondary-text"
						>
							Who do you want this post to be visible to?
						</p>
						<div className="form-group checkbox-inline">
							<label>Students</label>
							<input
								type="checkbox"
								name="student"
								checked={visibleStudent ? true : false}
								value={visibleStudent}
								id="student"
								onChange={(e) =>
									setVisibleStudent(!visibleStudent)
								}
							/>
						</div>
						<div className="form-group checkbox-inline">
							<label>Faculty</label>
							<input
								type="checkbox"
								name="prof"
								checked={visibleFaculty ? true : false}
								value={visibleFaculty}
								id="prof"
								onChange={(e) =>
									setVisibleProf(!visibleFaculty)
								}
							/>
						</div>
						<div className="form-group checkbox-inline">
							<label>Alumni</label>
							<input
								type="checkbox"
								name="alumni"
								checked={visibleAlumni ? true : false}
								value={visibleAlumni}
								id="alumni"
								onChange={(e) =>
									setVisibleAlumni(!visibleAlumni)
								}
							/>
						</div>
					</div>
					<div className="back-submit-buttons">
						<Link
							className="btn btn-light my-1"
							to="/dashboard"
							style={{ width: "40%" }}
						>
							Go Back
						</Link>
						<input
							type="submit"
							className="btn btn-primary my-1"
							style={{ width: "40%" }}
						/>
					</div>
				</form>
			</div>
			{text !== "" && (
				<div
					className="container preview"
					style={{ marginBottom: "2em" }}
				>
					<p>
						<strong>Preview:</strong>
					</p>
					<div className="parsed-text">{parse(text)}</div>
					{image.preview && (
						<img src={image.preview} width="100" height="100" />
					)}
				</div>
			)}
		</React.Fragment>
	);
};

PostForm.propTypes = {
	createPost: PropTypes.func.isRequired,
	createPostRequest: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, {
	createPost,
	createPostRequest,
	setAlert,
})(withRouter(PostForm));
