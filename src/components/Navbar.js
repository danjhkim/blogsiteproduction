import { Link } from 'react-router-dom';
import React from 'react';

import Gauth from './Gauth';

import styles from '../styles/Nav.module.css';

const Navbar = () => {
	return (
		<div className='wrapper'>
			<nav className={styles.nav}>
				<div className={styles.line}>
					<input type='checkbox' className={styles.checked} />
					<div className={`${styles.hamburger}`}>
						<span className={styles.line}></span>
						<span className={styles.line}></span>
						<span className={styles.line}></span>
					</div>
					<div className={`${styles.navblock}`}>
						<div className={styles.navlinks}>
							<Link className={styles.red} to='/'>
								<div className={styles.button2}>
									<span>Home</span>
								</div>
							</Link>
							<Link className={styles.red} to='/create'>
								<div className={styles.button2}>
									<span>Create</span>
								</div>
							</Link>
							<Link className={styles.red} to='/blogs/'>
								<div className={styles.button2}>
									<span>Blog List</span>
								</div>
							</Link>
						</div>
					</div>
					<div className={styles.title}>
						<Link to='/'>
							<h1>Blog Site</h1>
						</Link>
					</div>
					<div className={styles.links}>
						<Link className={styles.red} to='/'>
							<div className={styles.button2}>
								<span>Home</span>
							</div>
						</Link>
						<Link className={styles.red} to='/create'>
							<div className={styles.button2}>
								<span>Create</span>
							</div>
						</Link>
						<Link className={styles.red} to='/blogs/'>
							<div className={styles.button2}>
								<span>Blog List</span>
							</div>
						</Link>
					</div>
					<div className={styles.google}>
						<Gauth />
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
