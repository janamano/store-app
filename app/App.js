import React, { Component } from 'react';
import Home from './components/Home.js';
import SignUp from './components/SignUp.js';
import Profile from './components/Profile.js'
import About from './components/About.js'
import SignIn from './components/SignIn.js'
import Dashboard from './components/Dashboard.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
    } from 'react-router-dom';

class App extends Component{
    // TODO: fetch user info from cookies/session
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/signup" component={SignUp} />
                    <Route path='/about' component={About} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/dashboard' component={Dashboard} />
                    <Route path='/profile' component={Profile} />
                </Switch>
            </Router>
        )
    }
}

export default App;