import React from 'react';
import { TextField,Button} from 'react-md';
import "../styles/userpanel.scss";
import cookie from 'react-cookies';
import { IsVerified, Verify } from '../api/requests';

type State = {
    [key: string]: any
}

export class VerificationPanel extends React.Component<any, State> {
    state= {
        error:'',
        code:''
    };
    componentDidMount= async ()=> {
        let token = cookie.load("jwt");
        let verified = await IsVerified(token);
        if(verified.Ok) {
            window.location.href = "/";
        }
    } 
    OnClickVerifyButton = async ()=>{
        let token = cookie.load("jwt");
        let data = await Verify(token,this.state.code);
        if(data.OK) {
            window.location.href = "/";
        }else{
            this.setState({error:data.message});
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
			<div>
                 <TextField
                    type="text"
                    placeholder="verification code"
                    name="code"
                    id="code"
                    value={this.state.code}
                    onChange={this.handleInputChange}
                /><br />
                <Button
                    onClick={this.OnClickVerifyButton}
                    type="submit"
                    raised={true}
                    secondary={true}
                >Verify</Button><br/>{this.state.error}<br />
			</div>
		)
	}
}