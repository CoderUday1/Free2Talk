import React, { Component } from 'react';
import '../styles/meet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faEdit, faEnvelope, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

class MeetPage extends Component {
    state = {
        isSidebarOpen: false,
        activeButton: null
    };

    toggleSidebar = (button) => {
        this.setState({
            isSidebarOpen: button=='collapse' ? !this.state.isSidebarOpen : true,
            activeButton: button
        });
    };

    render() {
        return (
            <div className="meet-page">
                <div className={`sidebar ${this.state.isSidebarOpen ? 'open' : ''}`}>
                    <div className="sidebar-content">
                        <ul className={`sidebar-buttons ${this.state.isSidebarOpen ? 'horizontal' : ''}`}>
                            <li>
                                <button onClick={() => this.toggleSidebar('chat')}>
                                    <FontAwesomeIcon icon={faMessage} />
                                    {this.state.isSidebarOpen && this.state.activeButton === 'chat' && <span>Chat</span>}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.toggleSidebar('settings')}>
                                    <FontAwesomeIcon icon={faEdit} />
                                    {this.state.isSidebarOpen && this.state.activeButton === 'settings' && <span>Settings</span>}
                                </button>
                            </li>
                            <li>
                                <button onClick={() => this.toggleSidebar('contact')}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    {this.state.isSidebarOpen && this.state.activeButton === 'contact' && <span>Contact</span>}
                                </button>
                            </li>

                            {   this.state.isSidebarOpen &&  (
                                <li>
                                    <button onClick={() => this.toggleSidebar('collapse')}>
                                        <FontAwesomeIcon icon={faArrowRightLong} />
                                    </button>
                                </li>
                                )
                            }
                           
                        </ul>
                        {this.state.isSidebarOpen && this.state.activeButton === 'chat' && (
                            <div className="chat-content">
                                <div className="messages">
                                    {/* Render messages here */}
                                </div>
                                <input type="text" placeholder="Enter message" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="content">
                    {/* Main content of the MeetPage */}
                    <h1>Welcome to the Meet Page</h1>
                </div>
            </div>
        );
    }
}

export default MeetPage;