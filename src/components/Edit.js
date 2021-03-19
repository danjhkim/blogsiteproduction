import React from 'react'
import Blogform from './Blogform'
import { editFunc, fetchFuncUser } from '../apis/blogRESTFuncs'
import { withRouter } from "react-router";

class Edit extends React.Component {
    state = { user: null }
    componentDidMount() {
        fetchFuncUser(this.props.match.params.id).then(res => {
            this.setState({ user: res })
        })
    }

    onSubmit = (blog) => {
        editFunc(this.props.match.params.id, blog);
    };

    render() {
        if (this.state.user) {
            const { title, author, content, showPost } = this.state.user
            return (
                <Blogform buttonText="Edit " header="Edit Blog" onSubmit={this.onSubmit} initalData={{ title, author, content, showPost }} completed="edited" />
            )
        } else {
            return (
                <div>Loading..</div>
            )
        }
    }
}

export default withRouter(Edit)