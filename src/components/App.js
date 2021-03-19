import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar'
import Home from './Home'
import Create from './Create'
import BlogList from './BlogList';
import BlogDetails from './BlogDetails'
import Edit from './Edit'
import history from '../history'
import { LoginStore } from '../contexts/LoginContext'



const App = () => {
    return (
        <Router history={history}>
            <LoginStore>
                <Navbar />
                <main className="wrapper">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/create">
                            <Create />
                        </Route>
                        <Route exact path="/blogs/">
                            <BlogList />
                        </Route>
                        <Route exact path="/blogs/:id">
                            <BlogDetails />
                        </Route>
                        <Route exact path='/blogs/edit/:id'>
                            <Edit />
                        </Route>
                    </Switch>
                </main>
            </LoginStore>
        </Router>
    );
}

export default App;
