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
                { urls: 'stun:stun.liveo.fr:3478' },
                {
                    urls:'turn:relay1.expressturn.com:3378',
                    username:'efU968JLQDI8WHIE8J',
                    credential:'VISGCgjmkybDk0Co'
                }
                // {
                //     urls:'turn:turn.cloudflare.com:3478',
                //     "username":"2b325fc0b121837cda3ea64b30c7e87dcf2b3453f249df515dc9543dd29192c2a1b360b1e15898c0c4649dc5e74572279e49318e3e99fd8bf840f64f86fa527c",
                // "credential":"aba9b169546eb6dcc7bfb1cdf34544cf95b5161d602e3b5fa7c8342b2e9802fb"}
            ]
        };
        const pc = new RTCPeerConnection(configuration);

        pc.ontrack = (event) => {
            console.log('Track event:===================================================', event);
            const [stream] = event.streams;
            setRemoteStream(stream);
        };

        return pc;

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