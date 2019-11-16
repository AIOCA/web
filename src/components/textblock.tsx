import React, { Component } from 'react';
import { Card, CardText, CardTitle, Divider,Media,MediaOverlay } from 'react-md';

interface TextBlockProps {
    content: any,
    title: string,
    subtitle: string,
    image?:string,
};

//PanelButton component 
//Mainly used in admin panel
export class TextBlock extends Component<TextBlockProps> {
    render() {
        return (
            <>
            <Card className="cards__example">
            <Media>
                <img src={this.props.image} alt="Time to commute" />
                <MediaOverlay>
                <CardTitle title={this.props.title} subtitle={this.props.subtitle} />
                </MediaOverlay>
            </Media>
                
                <CardText>
                <div className="textblock-content">
                    {this.props.content}
                </div>  
                </CardText>
            </Card>
            <Divider/>
            </>
        )
    }

}
