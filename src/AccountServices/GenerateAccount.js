import React from 'react';
import { Component } from 'react';
import GenerateAccountModal  from "./GenerateAccountModal";

class GenerateAccount extends Component {
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
        <div className={"signup-button-box"}>
        <button onClick={this.toggleSeen} className={"signup-button"}> Generate Account</button>
            {this.state.seen && <GenerateAccountModal toggleClose={this.toggleSeen} />}
        </div>
        )
    }
}
export default GenerateAccount;

