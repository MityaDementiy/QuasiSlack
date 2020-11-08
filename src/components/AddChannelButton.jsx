import React from 'react';
import { useDispatch } from 'react-redux';

import { openModal } from '../slices/modalsSlice';

const AddChannelButton = () => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(openModal('adding'));
  };

  return (
    <button className='btn btn-light btn-sm' onClick={handleClick}>Add channel</button>
  );
};

export default AddChannelButton;
