import React, { Component } from 'react';
import LanguageOptions from './languageOptions'
import ButtonBar from './buttonBar';
import SearchBar from './searchBar';
import NavBar from './navBar';
import Groups from './groups'
import CreateGroup from './createGroup';

class Home extends Component {
    state = { 
        modalIsOpen: false
     } 
    
    openModal = () => {
        this.setState({ modalIsOpen: true });
    };

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    };

    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <h2 style={{textAlign:'center'}}> Language Practice Community</h2>
                <ButtonBar openModal={this.openModal}/>
                <CreateGroup openModal={this.openModal} modalIsOpen={this.state.modalIsOpen}
                        closeModal={this.closeModal}
                />
                <SearchBar />
                <LanguageOptions />
                <Groups/>
            </React.Fragment>
        );
    }
}
 
export default Home;