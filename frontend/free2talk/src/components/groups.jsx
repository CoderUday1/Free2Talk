import React, { Component } from 'react';
import GroupCard from './groupCard';
import CreateGroup from './createGroup';

class Groups extends Component {
    state = { 
        modalIsOpen: false
     }

    styles = {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        gap:30,
    }


    render() { 
        return (
            <React.Fragment>
                <div  style={this.styles}>
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                    <GroupCard/>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Groups;