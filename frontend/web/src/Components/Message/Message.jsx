import React, { useState, useEffect } from 'react';
import { login } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Message = () => {
  const [message, setMessage] = useState('');
  const [recepteur, setRecepteur] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMessage = (e) => {
    e.preventDefault();
    dispatch(message({ message, recepteur }));
  };

  useEffect(() => {
    if (auth.status === 'succeeded') {
      navigate('/');
    }
  }, [auth.status, navigate]);

  return (
    <div>
      <h1>Messaging Page</h1>
      <p>Welcome to this page!</p>
      <form onSubmit={handleMessage}>
        <label htmlFor="mesage">Message:</label>
        <input
          type="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <label htmlFor="recepteur">Recepteur:</label>
        <input
          type="recepteur"
          id="recepteur"
          value={recepteur}
          onChange={(e) => setRecepteur(e.target.value)}
          required
        />
        <button type="submit" disabled={auth.status === 'loading'}>
          {auth.status === 'loading' ? 'Connexion en cours...' : 'Message'}
        </button>
        {auth.status === 'failed' && <p>{auth.error.message}</p>}
      </form>
    </div>
  );
};

export default Message;