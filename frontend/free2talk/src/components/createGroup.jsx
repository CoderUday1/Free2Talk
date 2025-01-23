import React, { Component, useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/createGroup.css'
import { useSocket } from '../providers/socket';
import { useNavigate } from 'react-router-dom';

function CreateGroup(props) {

    const customStyles = {
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
    

        const socket = useSocket();
        const [email, setEmail] = useState('');
        const [roomId, setRoomId] = useState(0);
        const navigate = useNavigate();

        const handleRoomJoined = ({ roomId }) => {
            console.log('Room Joined', roomId);
            navigate('/meet/' + roomId);
        };

        useEffect(() => {
            socket.on('joined-room', handleRoomJoined);

            return () => {
                socket.off('joined-room', handleRoomJoined);
            }
        }, [socket]);



        const handleJoinRoom = (event) => {
            event.preventDefault();
            socket.emit('join-room', roomId, email);
        };

        return (
            <div className='modal'>
                <Modal
                    isOpen={props.modalIsOpen}
                    onRequestClose={props.closeModal}
                    contentLabel="Create Group"
                    style={customStyles}
                >
                    <h2>Create Group</h2>
                    <form>
                        <label htmlFor="topic">Topic:</label>
                        <input type='text' name='topic' onChange={e=>setEmail(e.target.value)} placeholder='Any topic' />

                        <label htmlFor="maxPeople">Maximum People:</label>
                        <select name="maxPeople">
                            <option value="Unlimited">Unlimited</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        
                        <label htmlFor="languages">Language:</label>
                        <select name="languages" onChange={e=>setRoomId(e.target.value)}>
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
                        <button onClick={props.closeModal} type="button">Cancel</button>
                        <button type="submit" onClick={(e)=>{handleJoinRoom(e)}}>Create Group</button>
                    </form>
                </Modal>
            </div>
        );
}

export default CreateGroup;