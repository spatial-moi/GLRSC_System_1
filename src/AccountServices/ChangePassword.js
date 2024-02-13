import React from 'react';
import { Component } from 'react';
import ChangePasswordModal from "./ChangePasswordModal";

class ChangePassword extends Component {
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
            <div className={"change-password-button-box"}>
                <button onClick={this.toggleSeen} className={"change-password-button"}> Change Password </button>
                {this.state.seen && <ChangePasswordModal toggleClose={this.toggleSeen} />}
            </div>
        )
    }
}
export default ChangePassword;