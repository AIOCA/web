import * as React from 'react';
// import {  InputGroup } from '@blueprintjs/core'
import { TextField, Button } from 'react-md';
import { UserRegister } from "../api/requests";

interface LoginProps {
    OnLoggedIn: Function
}

type State = {
    [key: string]: any
}

export class Register extends React.Component<LoginProps, State>{
    state = {
        user_name: '',
        display_name: '',
        password: '',
        email: '',
        address: '',
        AuthError: ''
    }

    OnClickRegisterButton = async () => {
        let data = await UserRegister(this.state.user_name, this.state.display_name, this.state.password, this.state.email, this.state.address);
        
        if (data !== null) {
            this.setState({ AuthError: '' });
            if (data.OK) {
                
                window.location.href = "/login";
            } else {
                this.setState({ AuthError: data.message })
            }
        } else {
            this.setState({ AuthError: 'Connection failed' })
        }
    }

    handleInputChange = (value: any, event: any) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <>
                <h1><br />Register<br /></h1>
                <TextField
                    type="text"
                    placeholder="Username"
                    id="user_name"
                    name="user_name"
                    value={this.state.user_name}
                    onChange={this.handleInputChange}
                /><br /><br />
                <TextField
                    type="text"
                    placeholder="Display name"
                    name="display_name"
                    id="display_name"
                    value={this.state.display_name}
                    onChange={this.handleInputChange}
                /><br /><br />

                <TextField
                    type="text"
                    placeholder="Email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                /><br /><br />

                <TextField
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                /><br /><br />
                <TextField
                    placeholder="Address"
                    rows={2}
                    name="address"
                    id="address"
                    value={this.state.address}
                    onChange={this.handleInputChange}
                /><br /><br />
                <Button
                    onClick={this.OnClickRegisterButton}
                    type="submit"
                    raised={true}
                    secondary={true}
                >Register</Button>
                <div id="autherror">{this.state.AuthError}</div>
            </>
        )
    }
}