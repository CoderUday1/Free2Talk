import React from 'react';
import { useSocket } from '../providers/socket';

export const withSocket = (Component) => (props) => {
    const socket = useSocket();
    return <Component {...props} socket={socket} />;
};