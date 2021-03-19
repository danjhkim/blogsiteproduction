import React from 'react'
import { postFunc } from '../apis/blogRESTFuncs'
import Blogform from './Blogform'

const Create = () => {
    const onSubmit = (blog) => {
        postFunc(blog);
    };

    return (
        <Blogform buttonText="Create " header="Add a Blog!" onSubmit={onSubmit} initalData={{ title: '', content: '', author: '', showPost: false }} completed="posted" />
    )
}

export default Create;