import * as React from 'react';
import { AuthRequest } from "../api/requests";
import { Button, TextField } from "react-md";

//Used to store OnUserLoggedIn function passed from app just to call from here
interface LoginProps {
    OnLoggedIn: Function
}

type State = {
    [key: string]: any
}

//Login page representation
export class Login extends React.Component<LoginProps, State>{
    state = {
        Name: '',
        Password: '',
        AuthError: ''
    }

    OnClickLoginButton = async () => {
        let data = await AuthRequest(this.state.Name, this.state.Password);
        if (data !== null) {
            if (data.Ok) {
                this.props.OnLoggedIn(data.token, data.admin, data.user);
                this.setState({ AuthError: '' })
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
                <h1><br />Login<br /></h1>
                <TextField
                    id="Name"
                    type="text"
                    placeholder="Username"
                    name="Name"
                    value={this.state.Name}
                    onChange={this.handleInputChange}
                /><br /><br />
                <TextField
                    id="Password"
                    type="password"
                    placeholder="Password"
                    name="Password"
                    value={this.state.Password}
                    onChange={this.handleInputChange}
                /><br /><br />
                <Button
                    onClick={this.OnClickLoginButton}
                    type="submit"
                    raised={true}
                    secondary={true}
                >
                    Login
                </Button>
                <div id="autherror">{this.state.AuthError}</div>
            </>
        )
    }
}