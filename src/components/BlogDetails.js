import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchFuncUser, deleteFunc } from '../apis/blogRESTFuncs';

import history from '../history';
import styles from '../styles/BlogDetails.module.css';
import Modal from '../components/Modal';
import Loader from './Loader';
import animations from '../styles/animations.module.css';
import LoginContext from '../contexts/LoginContext';

const BlogDetails = () => {
	const [openModal, setOpenModal] = useState(false);
	const [blog, setBlog] = useState(null);
	const { id } = useParams();
	const gID = useContext(LoginContext);

	useEffect(() => {
		fetchFuncUser(id).then(res => {
			setBlog(res);
		});
	}, [id]);

	const openDeleteModal = () => {
		setOpenModal(true);
	};

	const deleteBlog = () => {
		deleteFunc(id);
		alert('Blog Deleted!');
		history.push('/blogs');
		window.location.reload();
	};

	const renderActions = () => {
		return (
			<React.Fragment>
				<button
					onClick={deleteBlog}
					className={`${styles.delete} ${animations.hvrgrow}`}>
					Yes
				</button>
				<button
					onClick={() => setOpenModal(false)}
					className={`${styles.back} ${animations.hvrgrow}`}>
					No
				</button>
			</React.Fragment>
		);
	};

	if (blog === null) {
		return <Loader />;
	}

	if (gID.userId === blog.userId || blog.showPost === true) {
		return (
			<div>
				<div>BlogDetails</div>
				<div className={styles.container}>
					<div className={styles.title}>
						<h3>Title: {blog.title}</h3>
					</div>
					<div className={styles.author}>
						<p>Author: {blog.author}</p>
					</div>
					<div className={styles.content}>
						<p>{blog.content}</p>
					</div>
					<p className={styles.date}>
						Posted On: {blog.postDate} at {blog.time}
					</p>
					<div className={styles.buttons}>
						{gID.userId === blog.userId ? (
							<Link
								to={`/blogs/edit/${blog.id}`}
								className={`${styles.edit} ${animations.hvrgrow}`}>
								Edit
							</Link>
						) : null}
						{gID.userId === blog.userId ? (
							<button
								onClick={openDeleteModal}
								className={`${styles.delete} ${animations.hvrgrow}`}>
								Delete
							</button>
						) : null}
						<button
							onClick={() => history.push('/blogs')}
							className={`${styles.back} ${animations.hvrgrow}`}>
							Back
						</button>
						{openModal && (
							<Modal
								onDismiss={() => setOpenModal(false)}
								title='Are you sure you want to delete?'
								actions={renderActions()}
							/>
						)}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.create}>
				<h2 className={styles.notLogged}>Log in to start blogging!</h2>
			</div>
		);
	}
};

export default BlogDetails;
