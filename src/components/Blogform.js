import React, { useState, useContext } from 'react'

import LoginContext from '../contexts/LoginContext'
import Modal from './Modal'
import styles from '../styles/Create.module.css'
import history from '../history'
import Loader from './Loader'
import animations from '../styles/animations.module.css'

const Blogform = ({ buttonText, header, onSubmit, initalData, completed }) => {
    const gID = useContext(LoginContext);
    const [title, setTitle] = useState(initalData.title);
    const [content, setContent] = useState(initalData.content);
    const [author, setAuthor] = useState(initalData.author);
    const [pending, setPending] = useState(null)
    const [complete, setComplete] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, author, content }
        setPending(true)
        if (!validate(blog)) {
            setPending(false)
            return
        } else {
            try {
                let postDate = new Date();
                let stringDate = postDate.toLocaleDateString();
                let time = postDate.toLocaleTimeString()
                let userId = gID.userId
                let showPost = gID.showOthers
                const newblog = { ...blog, stringDate, time, userId, showPost }
                onSubmit(newblog)
                setPending(false)
                setComplete(true)
            } catch (err) {
                if (err.message === "Failed to post") {
                    console.log('Could not post the information');
                }
            };
        }
    }

    const validate = e => {
        let verify = true;
        if (!e.title && !e.author && !e.content) {
            alert('Cannot submit an empty post')
            return
        } else if (!e.title) {
            alert('Please enter a title')
            verify = false;
            return
        } else if (e.title.length < 3) {
            alert('Title must be longer than 3 characters')
            verify = false;
            return
        }
        if (!e.author) {
            alert('Please enter an author')
            verify = false;
            return
        }
        if (!e.content) {
            alert('You need content to submit your post')
            verify = false;
            return
        }
        if (e.title.length > 25) {
            alert('Title cannot be longer than 35 characters')
            verify = false;
            return
        }
        if (e.author.length > 25) {
            alert('Name of author cannot be longer than 35 characters')
            verify = false;
            return
        }
        if (e.content.length > 1500) {
            alert('Content cannot exceed 1500 characters')
            verify = false;
            return
        }
        return verify;
    };

    if (complete) {
        return (
            <Modal onDismiss={() => history.push('/blogs')} title={`Your blog post has been ${completed}!`} />
        )
    }

    const redAlerter = () => {
        if (content.length > 1500) {
            return `red`
        } else {
            return `none`
        }
    }

    const renderInputs = () => {
        return (
            <div className={styles.textformat}>
                <label htmlFor="title">Title</label>
                <input onChange={(e) => setTitle(e.target.value)} id="title"
                    type="text" autoComplete="off" value={title} />
                <label htmlFor="title">Author</label>
                <input onChange={(e) => setAuthor(e.target.value)} id="author"
                    type="text" autoComplete="off" value={author} />
                <label htmlFor="content">Post here:</label>
                <textarea className={styles[`${redAlerter()}`]} onChange={(e) => setContent(e.target.value)} id="content" type="text" value={content} />
            </div>
        )
    }

    if (gID.isSignedIn) {
        return (
            <div className={styles.create}>
                <h2>{header}</h2>
                <form onSubmit={handleSubmit}>
                    {renderInputs()}
                    <div className={styles.buttonContainer}>
                        <div className={styles.checkbox}>
                            <label htmlFor="show">Share with others</label>
                            <input defaultChecked={initalData.showPost} className={styles.checking} type="checkbox" onChange={() => gID.checkBox()} />
                        </div>
                        {!pending ? <button className={`${styles.button} ${animations.hvrgrow}`} type="submit" >{buttonText}</button> : <Loader />}
                    </div>
                </form>
            </div >
        );
    } else {
        return (
            <div className={styles.create}>
                <h2>Log in to start blogging!</h2>
            </div >
        );
    }


}

export default Blogform;