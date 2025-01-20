import React, { Component } from 'react';

class NavBar extends Component {
    state = {  } 

    styles = {
        display:'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
        }

    render() { 
        return (
            <React.Fragment>
                <div style={this.styles}>
                    <span><img style={{height:30, width:30}} src="../logo192.png"/> <h5 style={{display:'inline'}}>Free2Talk</h5></span>
                    <button>Sign in</button>
                </div>
            </React.Fragment>
        );
    }
}
 
export default NavBar;