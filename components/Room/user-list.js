export default function UserList({users}) {
    return (
        <>
            <div>List User:</div>
            {users.map((user, index) => (
                <div key={user.id}>
                    {user.pseudo} ({user.id})
                </div>
            ))}
        </>
    );
}
