import { useGetAllUsersQuery } from "../slices/usersApiSlice.js";
import Loader from "../components/Loader.jsx";

const UserListPage =() => {
    const { data: users, isLoading, isError, error } = useGetAllUsersQuery();
    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map((user,i) => (
                    <li key={i}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserListPage;


