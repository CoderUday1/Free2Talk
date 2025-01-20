import React, { Component } from 'react';

class LanguageOptions extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <button className='warning'>English</button>
                <button>Hindi</button>
                <button>Telugu</button>
                <button>Kannada</button>
            </React.Fragment>
        );
    }
}
 
export default LanguageOptions;