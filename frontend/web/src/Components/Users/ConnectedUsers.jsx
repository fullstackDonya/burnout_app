import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConnectedUsers } from '../redux/slices/UsersSlice';

const ConnectedUsers = () => {
    const dispatch = useDispatch();
    const connectedUsers = useSelector((state) => state.connectedUsers.users);
    const loading = useSelector((state) => state.connectedUsers.loading);
    const error = useSelector((state) => state.connectedUsers.error);

    useEffect(() => {
        dispatch(fetchConnectedUsers());
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