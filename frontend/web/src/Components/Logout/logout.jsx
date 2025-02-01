import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';
const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button onClick={handleLogout}>   <FontAwesomeIcon icon={faDoorClosed} /> </button>
  );
};

export default Logout;