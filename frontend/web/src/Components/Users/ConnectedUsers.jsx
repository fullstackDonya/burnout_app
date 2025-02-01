import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/slices/usersSlice';

const ConnectedUsers = () => {
    const dispatch = useDispatch();
    const connectedUsers = useSelector((state) => state.users.list);
    const loading = useSelector((state) => state.users.loading);
    const error = useSelector((state) => state.users.error);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Connected Users</h2>
            <ul>
                {connectedUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ConnectedUsers;