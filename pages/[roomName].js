import {useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSocket from '@/hooks/useSocket';
import UserSelection from '@/components/Room/user-selection';
import UserList from '@/components/Room/user-list';
import {displayDate} from '@/lib/date-handler';

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
};

export default function Room(props) {
    const [pseudo, setPseudo] = useState('');
    const [userList, setUserList] = useState([]);
    const [field, setField] = useState('');
    const [newMessage, setNewMessage] = useState(0);
    const [messages, setMessages] = useState(props.messages || []);

    console.log({roomName: props.roomName});

    // Value Enum: 'pseudo', 'message'
    const [view, setView] = useState('pseudo');

    const socket = useSocket('message.chat1', message => {
        setMessages(messages => [...messages, message]);
    });

    useSocket('user.connect', users => {
        setUserList([...users]);
    });
    useSocket('pseudo.error', users => {
        setView('pseudo');
        setPseudo('');
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
                <h1 className="text-center h-[4vh]">Welcome to the Room</h1>
                <div className="flex flex-col gap-3 mx-2 overflow-y-auto h-[90vh]">
                    {messages.map((msg, index) => (
                        <div className="flex flex-col px-2 py-1 text-black bg-white rounded" key={index}>
                            <div className="flex flex-row gap-2">
                                <div>{msg.pseudo}</div>
                                <div>{displayDate(msg.id)}</div>
                            </div>
                            <div>{msg.value}</div>
                        </div>
                    ))}
                    <AlwaysScrollToBottom />
                </div>
                <div className="h-[5vh]"></div>
            </div>
            <div className="absolute bottom-0 w-full px-4 h-[5vh] border border-low-white">
                <input
                    className="w-5/6 px-2 text-black border border-black"
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
                <div className="flex flex-row">
                    <div className="w-1/5 h-screen px-2">
                        <div>Channel List</div>
                    </div>
                    <div className="relative w-3/5 h-screen border-b border-l border-r border-low-white">
                        {MessageView}
                    </div>
                    <div className="w-1/5 px-2">
                        <UserList users={userList} />
                    </div>
                </div>
            )}
        </div>
    );
}

export const getServerSideProps = async context => {
    const {roomName} = context.query;
    return {
        props: {
            roomName,
        },
    };
};
