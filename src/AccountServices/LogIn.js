import React from 'react';
import { Component } from 'react';
import LogInModal from "./LogInModal";

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {seen: false}
        this.toggleSeen = this.toggleSeen.bind(this)
    }

    toggleSeen() {
        this.setState({seen: !this.state.seen})
    }

    render() {
        return (
            <div className={"login-button-box"}>
                <button onClick={this.toggleSeen} className={"login"}> Log In </button>
                {this.state.seen && <LogInModal toggleClose={this.toggleSeen} />}
            </div>
        )
    }
}
export default LogIn;