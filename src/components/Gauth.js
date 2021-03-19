import React from 'react';

import LoginContext from '../contexts/LoginContext'
import styles from '../styles/google.module.css'

class Gauth extends React.Component {
    static contextType = LoginContext;
    componentDidMount() {
        this.context.loadAuth()
    }

    renderAuthButton() {
        if (this.context.isSignedIn === null) {
            return null
        } else if (this.context.isSignedIn) {
            return (
                <div className={styles.buttonOff} onClick={this.context.onSignOutClick}>
                </div>
            )
        } else {
            return (
                <div className={styles.buttonOn} onClick={this.context.onSignInClick}>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div>{this.renderAuthButton()}</div>
            </div>
        )
    }
}


export default Gauth
