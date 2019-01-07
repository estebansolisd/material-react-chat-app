import React from 'react';
import MessagesForm from './MessagesForm';
export default class MessagesUI extends React.Component{
    render(){
        return(
            <div>
                <MessagesForm user={this.props.user || "a person that reload the page"}/>
            </div> 
        );
    }
}