import React, { Component } from 'react';
import Modal from 'react-modal';
import '../styles/createGroup.css'

class CreateGroup extends Component {
    state = {
        modalIsOpen: false
    };

    customStyles = {
        content: {
            backgroundColor: 'white',
            color: 'black',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '600px',
            height:'400px',
            margin: 'auto'
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
    };
    
    render() {
        return (
            <div className='modal'>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    contentLabel="Create Group"
                    style={this.customStyles}
                >
                    <h2>Create Group</h2>
                    <form>
                        <label htmlFor="topic">Topic:</label>
                        <input type='text' name='topic' placeholder='Any topic' />

                        <label htmlFor="maxPeople">Maximum People:</label>
                        <select name="maxPeople">
                            <option value="Unlimited">Unlimited</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        
                        <label htmlFor="languages">Language:</label>
                        <select name="languages">
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                        </select>

                        <label htmlFor="level">Level:</label>
                        <select name="level">
                            <option value="ANY_LEVEL">Any level</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                        <button onClick={this.props.closeModal} type="button">Cancel</button>
                        <button type="submit">Create Group</button>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default CreateGroup;