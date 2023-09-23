import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import AuthService from "./components/AuthService";


class App extends Component {

    state = {
        isAuthenticated: !!AuthService.getCurrentUser()
    }

    handleSignIn = () => {
        this.setState({ isAuthenticated: true });
    }

    handleSignOut = () => {
        AuthService.logout();
        this.setState({ isAuthenticated: false });
    }

    render = () => {
        return (
            <Router>
                <Navigation isAuthenticated={this.state.isAuthenticated} onSignOut={this.handleSignOut}/>
                <Routes>
                    <Route path="/signin" element={<SignIn onSignIn={this.handleSignIn}/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route exact path="/" element={<SignIn onSignIn={this.handleSignIn}/>} /> {/* Default route */}
                </Routes>
            </Router>
        );
    }
}

export default App;
