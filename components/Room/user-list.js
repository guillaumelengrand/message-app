export default function UserList({users}) {
    return (
        <>
            <div>User List</div>
            {users.map((user, index) => (
                <div key={user.id}>
                    {user.pseudo} ({user.id})
                </div>
            ))}
        </>
    );
}
