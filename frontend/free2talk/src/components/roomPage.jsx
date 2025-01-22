import React, { useState, useCallback } from 'react';
import { useSocket } from '../providers/socket';
import { useEffect } from 'react';
import { usePeer } from '../providers/Peer';
import ReactPlayer from 'react-player';

const RoomPage = () => {
    const socket = useSocket();
    console.log("soketid",socket.id)
    const {peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream} = usePeer();
    const [myStream, setMyStream] = useState(null);
    const [remoteEmailId, setRemoteEmailId] = useState(null);

    const handleNewUserJoined = useCallback(
        async (userId) => {
        console.log("New user joined room ", userId);
        const offer = await createOffer();
        console.log("userId.....",userId);
        setRemoteEmailId(userId);
        socket.emit('send-sdp', {userId, sdp:offer});
    }, [createOffer, socket, setRemoteEmailId]);

    const handleIncomingCall = useCallback( async (data) => {
        console.log("receive-sdp",data)
        let {from, sdp} = data;
        peer.setRemoteDescription(sdp);

        const ans = await createAnswer(sdp);
        console.log(ans)
        socket.emit('accept-sdp',{userId: from, ans});

    },[peer, createAnswer, socket]);

    const handlecomingCall = useCallback( async (data) => {
        console.log("receive-sdp----------",data)
    })

    const handleCallAccepted = useCallback( async (data) => {
        console.log("call accepted", data);
        const { ans } = data;
        console.log("call accepted", ans);

        await setRemoteAnswer(ans);
        console.log("Call got accepted");
    },[setRemoteAnswer]);

    const getUserMediaStream = useCallback(async () => {
        try{
        // const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        const stream = null;
        setMyStream(stream);
        }catch(error) {
            console.log(error)
        }

    }, [sendStream, setMyStream]);

    useEffect(() => {
        socket.on('user-connected', handleNewUserJoined)
        socket.on('receive-sdp', handleIncomingCall)
        socket.on('receive-sdplu', handlecomingCall)

        socket.on('receive-accept-sdp', handleCallAccepted)
        socket.on('receive-message', (message) => {
            console.log("HHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEELLLLLOooooo")
        })

        return () => {
            socket.off('user-connected', handleNewUserJoined)
            socket.off('receive-sdp', handleIncomingCall)
            socket.off('receive-accept-sdp', handleCallAccepted)
        }
    }, []);

    const handleNegosiation = useCallback(() => {
        const localOffer = peer.localDescription;
        socket.emit('send-sdp', {userId: remoteEmailId, sdp: localOffer});
    })

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegosiation);
        
        return () => {
            peer.removeEventListener('negotiationneeded', handleNegosiation);
        }
    }, [])  

    useEffect(()=>{
        getUserMediaStream();
    })

    return (
        <div className="room-page-continer">
            <h1>Room Page</h1>
            <p>You are connected to {remoteEmailId}</p>
            <button onClick={(e) => sendStream(myStream)}> Send My video </button>
            <ReactPlayer url={myStream} playing={true} controls={true} />
            <ReactPlayer url={remoteStream} playing={true} controls={true} />

        </div>
    )


    

}

export default RoomPage;