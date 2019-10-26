import React, { Component } from 'react';
import { Card, CardText, Cell } from 'react-md';
import { Link } from 'react-router-dom';

interface PanelProps {
    id: string,
    text: string,
    href: string,
    bgcolor: string,
    color: string,
};

//PanelButton component 
//Mainly used in admin panel
export class PanelButton extends Component<PanelProps> {
    render() {
        return (
            <Cell size={4} >
                <Link to={this.props.href}>
                    <Card >
                        <CardText style={{ backgroundColor: this.props.bgcolor }} className="paneltext">
                            <p style={{ color: this.props.color }}>{this.props.text}</p>
                        </CardText>
                    </Card>
                </Link>
            </Cell>
        )
    }

}
