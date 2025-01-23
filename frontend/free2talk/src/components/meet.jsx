import React, { Component } from 'react';
import '../styles/meet.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faEdit, faEnvelope, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import RoomPage from './roomPage';
import { withSocket } from './withSocket';

class MeetPage extends Component {
    state = {
        isSidebarOpen: false,
        activeButton: null,
        messages: [],
        typing:""
    };

    componentDidMount() {
        const { socket } = this.props;
        socket.on('receive-message', this.handleReceiveMessage);
    }


    componentWillUnmount() {
        const { socket } = this.props;
        socket.off('receive-message', this.handleReceiveMessage);
    }

    handleReceiveMessage = (message) => {
        console.log('Message received:', message);
        this.setState((prevState) => ({
            messages: [...prevState.messages, message]
        }), () => {
            // Append the message to the DOM
            const messagesContainer = document.querySelector('.messages');
            console.log("Appending message to DOM",messagesContainer);

            if (messagesContainer) {
                console.log("Appending message to DOM");
                const messageElement = document.createElement('div');
                messageElement.textContent = message;
                messagesContainer.appendChild(messageElement);
            }
        });
    };

    appendMessage = (message, who) => {
        // Append the message to the DOM
        const messagesContainer = document.querySelector('.messages');
        console.log("Appending message to DOM",messagesContainer);

        if (messagesContainer) {
            console.log("Appending message to DOM");
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messageElement.className = who;
            messagesContainer.appendChild(messageElement);
        }
    };

    sendMessage = (message) => {
        const { socket } = this.props;
        socket.emit('send-message', message);
        this.setState({typing:""})
        this.appendMessage(message, 'sender');
    };

    submitClicked = () => {
        console.log("Submit clicked", this.state.typing);
        this.sendMessage(this.state.typing);
    }

    toggleSidebar = (button) => {
        this.setState({
            isSidebarOpen: button === 'collapse' ? !this.state.isSidebarOpen : true,
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
                                <input type="text" value={this.state.typing} onChange={(event)=> this.setState({ typing: event.target.value })} placeholder="Enter message" />
                                <button onClick={this.submitClicked}>Send</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="content">
                    {/* Main content of the MeetPage */}
                    <RoomPage/>
                </div>
            </div>
        );
    }
}

export default withSocket(MeetPage);