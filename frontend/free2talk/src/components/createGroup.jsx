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
        const [creatorId, setCreatorId] = useState('');
        const [topicName, setTopicName] = useState('Any topic');
        const [language, setLanguage] = useState('ENGLISH');

        const [level, setLevel] = useState('ANY_LEVEL');
        const [limit, setLimit] = useState(2);


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
            console.log(email)
            console.log(topicName)
            console.log(creatorId)
            console.log(language)
            console.log(level)
            console.log(limit)

            fetch('http://localhost:8080/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    creatorId: creatorId,
                    topicName: topicName,
                    languages: [language],
                    level: level,
                    limit: limit
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.roomId) {
                    socket.emit('join-room', data.roomId, email);
                }

                props.closeModal();
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            // socket.emit('join-room', roomId, email);
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
                    <form className='create-group-form' action="http://localhost:8080/group" method="post">
                        <label htmlFor="topicName">Topic:</label>
                        <input type='text' name='topicName' placeholder='Any topic' onChange={e=>setTopicName(e.target.value)}/>
                        
                        <br/>
                        <input hidden="true" typee='int' name='creatorId' onChange={e=>{setEmail(e.target.value);setCreatorId(e.target.value)}}  />
          
                        <br/>
                        <label htmlFor="languages">Language:</label>
                        <select name="languages" onChange={e=>setLanguage(e.target.value)}>
                            <option value="ENGLISH">English</option>
                            <option value="HINDI">Hindi</option>
                            <option value="TELUGU">Telugu</option>
                        </select>
                        <br/>
                        <label htmlFor="level">Level:</label>
                        <select name="level" onChange={e=>setLevel(e.target.value)}>
                            <option value="ANY_LEVEL" selected>Any level</option>
                            <option value="BEGINNER">Beginner</option>
                            <option value="INTERMEDIATE">Intermediate</option>
                            <option value="ADVANCED">Advanced</option>
                        </select>
                        <br/>
                        <label htmlFor="limit">Maximum People:</label>
                        <select name="limit" onChange={e=>setLimit(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2" selected>2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <br/>
                        <button onClick={props.closeModal} type="button">Cancel</button>
                        <button type="submit" onClick={(e)=>{handleJoinRoom(e)}}>Create Group</button>
                    </form>
                </Modal>
            </div>
        );
}

export default CreateGroup;