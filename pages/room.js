import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSocket from '@/hooks/useSocket';
import UserSelection from '@/components/Room/user-selection';
import UserList from '@/components/Room/user-list';
import {displayDate} from '@/lib/date-handler';

export default function Room(props) {
    const [pseudo, setPseudo] = useState('');
    const [userList, setUserList] = useState([]);
    const [field, setField] = useState('');
    const [newMessage, setNewMessage] = useState(0);
    const [messages, setMessages] = useState(props.messages || []);

    // Value Enum: 'pseudo', 'message'
    const [view, setView] = useState('pseudo');
    /*useSocket('message.chat1', message => {
        setMessages(messages => [...messages, message]);
    });*/

    const socket = useSocket('message.chat1', message => {
        setMessages(messages => [...messages, message]);
    });

    useSocket('user.connect', users => {
        setUserList([...users]);
    });

    useEffect(() => {
        let pseudo = localStorage.getItem('pseudo');
        if (pseudo) {
            sendPseudo(pseudo);
        }
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        // create message object
        const message = {
            id: new Date().getTime(),
            pseudo: pseudo,
            value: field,
        };

        // send object to WS server
        socket.emit('message.chat1', message);
        setField('');
        setMessages(messages => [...messages, message]);
    };

    const sendPseudo = pseudo => {
        setView('message');
        setPseudo(pseudo);

        if (localStorage.getItem('pseudo') === null) localStorage.setItem('pseudo', pseudo);

        socket.emit('pseudo', pseudo);
    };

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
            console.log('do validate');
            handleSubmit(event);
        }
    };

    const MessageView = (
        <>
            <div className="h-full">
                <h1 className="text-center">Welcome to the Room</h1>
                <div className="flex flex-col mx-2 overflow-y-auto h-screen-90">
                    {messages.map((msg, index) => (
                        <div key={index} className="">
                            <div className="">
                                <span>{displayDate(msg.id)} </span>
                                <span className="capitalize">{msg.pseudo}: </span>
                                <div>{msg.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 w-full px-4 my-2">
                <input
                    className="w-5/6 px-2 border border-black"
                    type="text"
                    value={field}
                    onChange={e => setField(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="w-1/6 px-2 border border-black" onClick={handleSubmit}>
                    Send
                </button>
            </div>
        </>
    );

    return (
        <div>
            <Head>
                <title>Chat Room</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {view === 'pseudo' ? (
                <UserSelection sendPseudo={sendPseudo} />
            ) : (
                <div className="flex flex-wrap">
                    <div className="relative w-3/4 h-screen border-l border-r border-black">{MessageView}</div>
                    <div className="w-1/4 px-2">
                        <UserList users={userList} />
                    </div>
                </div>
            )}
        </div>
    );
}
