import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import LoginContext from '../contexts/LoginContext'
import pic from '../images/desk.jpg'
import styles from '../styles/Home.module.css'

const Home = () => {
    const login = useContext(LoginContext);
    const history = useHistory();

    const toCreate = () => {
        if (!login.isSignedIn) {
            login.onSignInClick()
        }
        history.push('/create')
    }

    return (
        <div className={styles.home}>
            <div className={styles.hero} style={{ backgroundImage: `url(${pic})` }}>
                <div className={styles.hero__content}>
                    <div className={styles.box}>
                        <h1>Blog, share your story.</h1>
                        <button onClick={toCreate} className={`${styles.btn} ${styles.draw} ${styles.meet}`}>Start Blogging</button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;