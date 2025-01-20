import React, { Component } from 'react';


class ButtonBar extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <button onClick={this.props.openModal} className='btn-warning'>+ Create a new group</button>
                <button>Buy me a coffee</button>
                <button>Privacy Policy</button>
                <button>Creators</button>
            </React.Fragment>
        );
    }
}
 
export default ButtonBar;