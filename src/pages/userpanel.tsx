import React from 'react';
import { GridList, Avatar } from 'react-md';
import { PanelButton } from '../components/panelbutton';
import "../styles/userpanel.scss";
import cookie from 'react-cookies';

export class UserPanel extends React.Component<any, any, any> {
	render() {
		return (
			<div className="userpanel"><br/>
                <Avatar random>{cookie.load("username")[0]}</Avatar>
				<h1>
					Welcome {cookie.load("username")}
				</h1>
				<GridList container="pictures" size={2} component="section" >
					<PanelButton bgcolor="blue" color="white" text="View All Bookings" id="" href="" />
                    <PanelButton bgcolor="red" color="white" text="Estimate Rides" id="" href="/estimate" />
                    <PanelButton bgcolor="green" color="white" text="Track" id="" href="" />
                </GridList>
			</div>
		)
	}
}