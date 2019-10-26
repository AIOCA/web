import React from 'react';
import { GridList } from 'react-md';
import { PanelButton } from '../components/panelbutton';
import "../styles/adminpanel.scss";

export class AdminPanel extends React.Component<any, any, any> {
	render() {
		return (
			<div className="adminpanel">
				<h1>
					Admin Panel
				</h1>
				<GridList container="pictures" size={2} component="section" >
					<PanelButton bgcolor="blue" color="white" text="View All Bookings" id="" href="" />
				</GridList>
			</div>
		)
	}
}