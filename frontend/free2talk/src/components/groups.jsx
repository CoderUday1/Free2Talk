import React, { Component } from 'react';
import GroupCard from './groupCard';
import CreateGroup from './createGroup';

class Groups extends Component {
    state = { 
        modalIsOpen: false,
        groups: []
     }

    styles = {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        gap:30,
    }

    componentDidMount() {
        fetch('http://localhost:8080/groups')
        .then(response => response.json())
        .then(data => this.setState({groups: data}))

        console.log(this.state.groups)
    }

    render() { 
        return (
            <React.Fragment>
                <div  style={this.styles}>
                    {this.state.groups.map(group => (<GroupCard key={group.id} group={group}/>))}
                </div>
            </React.Fragment>
        );
    }
}
 
export default Groups;