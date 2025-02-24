import React, { Component } from 'react';
import '../styles/groupCard.css'

class GroupCard extends Component {
    state = {
        count:0,
        members: ['user1', 'user2', 'user3', 'user4']
    };

    styles = {
        fontWeight: 'bold',
        height:300,
        weight:350,
        minHeight:300,
        minWidth:350,
        border:'2px solid white'
    }

    handleJoin = () => {
        console.log("updated")
        this.setState({count:this.state.count+1});
    }

    render() { 
        return (
            <React.Fragment>
                <span className="group-card" style={this.styles}>
                    <h1 >{this.props.group.topicName}</h1>
                    <ul>
                        <li>Languages : {this.props.group.languages}</li>
                        <li>Leve : {this.props.group.level}</li>
                        <li>Limit : {this.props.group.limit}</li>
                    </ul>
                    <p>{this.formatCount()}</p>
                    <button onClick={this.handleJoin} className='btn btn-secondary btn-sm'>Join Group</button>
                </span>
            </React.Fragment>
        )
    }

    formatCount() {
        const { count } = this.state;
        return this.state.count === 0 ? <i>Zero</i> : count;
    }
}
 
export default GroupCard;