import React from 'react'

import styles from '../styles/Loader.module.css'

const Loader = () => {
    return (
        <div className={styles.center}>
            <div className={styles.ldsspinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Loader;