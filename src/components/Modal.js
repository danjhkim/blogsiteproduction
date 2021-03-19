import React from 'react'
import ReactDOM from 'react-dom'

import styles from '../styles/Modal.module.css'


const Modal = (props) => {
    return ReactDOM.createPortal(
        <div className={styles.ui} onClick={props.onDismiss}>
            <div className={styles.box} onClick={(e) => e.stopPropagation()}>
                <span onClick={props.onDismiss} className={styles.close}>&times;</span>
                <p>{props.title}</p>
                {props.actions && <div className="actions">{props.actions}</div>}
            </div>
        </div >, document.querySelector('#modal')
    )
}

export default Modal;