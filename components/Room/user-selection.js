import {useCallback, useState} from 'react';

export default function UserSelection({sendPseudo}) {
    const [newPseudo, setNewPseudo] = useState('');

    const submitPseudo = useCallback(e => {
        sendPseudo(newPseudo);
    });
    return (
        <div className="w-1/2 mx-auto md:w-1/3 lg:w-1/5">
            <h1 className="">Welcome to the Room</h1>
            <div>Pseudo:</div>
            <input
                className="w-full px-1 border border-black text-black"
                type="text"
                value={newPseudo}
                onChange={e => setNewPseudo(e.target.value)}
            />
            <button className="block px-1 mx-auto mt-2 border border-black" onClick={submitPseudo}>
                Envoyer
            </button>
        </div>
    );
}
