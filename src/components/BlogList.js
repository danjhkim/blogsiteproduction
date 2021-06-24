import React from 'react';
import { Link } from 'react-router-dom';

import { fetchFunc } from '../apis/blogRESTFuncs';
import styles from '../styles/BlogList.module.css';
import Loader from './Loader';
import LoginContext from '../contexts/LoginContext';

class BlogList extends React.Component {
	static contextType = LoginContext;
	state = {
		blogs: null,
		dimensions: {
			height: window.innerHeight,
			width: window.innerWidth,
		},
	};

	async componentDidMount() {
		try {
			const blogs = await fetchFunc();
			this.setState({ blogs: blogs });
		} catch (err) {
			if (err.message === 'Failed to fetch') {
				console.log('Could not retrieve information');
			}
		}
		window.addEventListener('resize', this.debounce);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.debounce);
	}

	debounce = () => {
		let timer;
		timer = setTimeout(() => {
			this.onBodyChange();
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	};

	onBodyChange = () => {
		this.setState({
			dimensions: {
				height: window.innerHeight,
				width: window.innerWidth,
			},
		});
	};

	renderedList = () => {
		const list = this.state.blogs.map((blog, index) => {
			if (blog.userId === this.context.userId || blog.showPost === true) {
				return (
					<div key={index} className={styles.blog}>
						<Link to={`/blogs/${blog.id}`}>
							<div className={styles.title}>
								<h3>Title: {blog.title}</h3>
							</div>
							<div className={styles.author}>
								<p>Author: {blog.author}</p>
							</div>
						</Link>
						{this.state.dimensions.width > 900 ? (
							<p className={styles.right}>
								Posted On: {blog.stringDate} at {blog.time}
							</p>
						) : (
							<p className={styles.right}>
								On: {blog.stringDate}
							</p>
						)}
						<hr />
					</div>
				);
			}
			return null;
		});
		return list;
	};

	render() {
		if (!this.state.blogs) {
			return <Loader />;
		}
		if (this.context.userId === null) {
			return <h2 className={styles.warning}>Log in to view blogs</h2>;
		}
		return (
			<div className={styles.blogbox}>
				<h1>BlogList</h1>
				<hr />
				{this.renderedList(this.state.blogs)}
			</div>
		);
	}
}

export default BlogList;
