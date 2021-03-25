import Head from 'next/head';
import {useEffect, useState} from 'react';

import io from 'socket.io-client';

export default function Room({}) {
    const [socket, setSocket] = useState(null);
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState('');
    useEffect(() => {
        fetch('/api/socketio').finally(() => {
            const socketIo = io();

            socketIo.on('connect', () => {
                console.log('connect');
                socketIo.emit('hello');
            });

            socketIo.on('hello', data => {
                console.log('hello', data);
            });

            socketIo.on('message', data => {
                console.log('message receive: ', data);
                setMessageList([...messageList, data]);
            });

            socketIo.on('a user connected', () => {
                console.log('a user connected');
            });

            socketIo.on('disconnect', () => {
                console.log('disconnect');
            });

            setSocket(socketIo);
        });
    }, []);

    const sendMessage = e => {
        e.preventDefault();
        console.log('send message: ', message);
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <Head>
                <title>Chat Room</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="">Welcome to the Room</h1>

            <div>
                <div>Message</div>
                {messageList.map(msg => (
                    <div>{msg}</div>
                ))}
            </div>
            <div>
                <input
                    className="px-2 border border-black"
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button className="px-2 mx-2 border border-black" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}
