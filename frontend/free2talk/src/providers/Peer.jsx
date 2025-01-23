import React, { useMemo, useEffect, useState, useCallback } from 'react';
const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
    const [remoteStream, setRemoteStream] = useState(null);

    const peer = useMemo(() => {
        const configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun.linea7.net:3478' },
                { urls: 'stun:stun.linphone.org:3478' },
                { urls: 'stun:stun.liveo.fr:3478' }
            ]
        };
        return new RTCPeerConnection(configuration);
    }, []);

    const createOffer = async () => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        return offer
    }

    const createAnswer = async (offer) => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(answer);
        console.log("peer.js", answer)
        return answer;
    }

    const setRemoteAnswer = async (answer) => {
        await peer.setRemoteDescription(answer);
    }   

    const sendStream = async(stream) => {
        const tracks = stream.getTracks();
        for(const track of tracks) {
            console.log("seding stearm...", track)
            peer.addTrack(track, stream);
        }
    }

    const handleTrackEvent = useCallback(ev => {
        const streams = ev.streams;
        console.log("settig remote streams=========================================================",streams)
        setRemoteStream(streams[0]);
    },[])

    useEffect(() => {
        peer.addEventListener('track', handleTrackEvent);
        return () =>{
            peer.removeEventListener('track', handleTrackEvent);
        }
    })

    return (
        <PeerContext.Provider value={{peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream, peer}}>
            {props.children}
        </PeerContext.Provider>
    )
}