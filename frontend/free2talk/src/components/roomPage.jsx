import React, { useState, useEffect, useCallback } from 'react';
import { useSocket } from '../providers/socket';
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player';

const RoomPage = () => {
    const socket = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream } = usePeer();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState(null);

    useEffect(() => {
        const getMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setMyStream(stream);
                sendStream(stream);
            } catch (error) {
                console.error('Error accessing media devices.', error);
            }
        };

        getMediaStream();
    }, [sendStream]);

    const handleNewUserJoined = useCallback(
        async (userId) => {
            console.log("New user joined room ", userId);
            const offer = await createOffer();
            socket.emit('send-sdp', userId, offer);
            setRemoteEmailId(userId);
        },
        [createOffer, socket]
    );

    const handleIncomingCall = useCallback(
        async (data) => {
            const { from, sdp } = data;
            console.log("receive-sdp", sdp);
            try {
                await peer.setRemoteDescription(new RTCSessionDescription(sdp));
                const answer = await createAnswer(sdp);
                console.log('Created answer:', answer);
                socket.emit('accept-sdp', { userId: from, sdp: answer });
                setRemoteEmailId(from);
            } catch (error) {
                console.error('Error handling incoming call:', error);
            }
        },
        [peer, createAnswer, socket]
    );

    const handleCallAccepted = useCallback(
        async (data) => {
            const { sdp } = data;
            console.log("accept-sdp", sdp);
            try {
                await peer.setRemoteDescription(new RTCSessionDescription(sdp));
            } catch (error) {
                console.error('Error handling call accepted:', error);
            }
        },
        [peer]
    );

    const handleNegosiation = useCallback(async () => {
        console.log("OOPS! NEGO, needed");
        const localOffer = await peer.createOffer();
        socket.emit('send-sdp', remoteEmailId, localOffer);
    }   ,[])

    useEffect(() => {
        socket.on('user-connected', handleNewUserJoined);
        socket.on('receive-sdp', handleIncomingCall);
        socket.on('accept-sdp', handleCallAccepted);

        return () => {
            socket.off('user-connected', handleNewUserJoined);
            socket.off('receive-sdp', handleIncomingCall);
            socket.off('accept-sdp', handleCallAccepted);
        };
    }, [socket, handleNewUserJoined, handleIncomingCall, handleCallAccepted]);

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegosiation);
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegosiation);
        }
    })

    return (
        <div>
            <h1>Room Page</h1>
            <h4>You are connected to {remoteEmailId}</h4>
            {myStream && <ReactPlayer url={myStream} playing muted />}
            {remoteStream && <ReactPlayer url={remoteStream} playing />}
        </div>
    );
};

export default RoomPage;