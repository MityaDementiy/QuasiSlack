import React from 'react';
import { useDispatch } from 'react-redux';
import i18next from 'i18next';

import { openModal } from '../slices/modalsSlice';

const ShowAddChannelModal = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openModal('adding'));
  };

  return (
    <button type="button" className="btn btn-light btn-sm" onClick={handleClick}>{i18next.t('interfaceTexts.addChannelButton')}</button>
  );
};

export default ShowAddChannelModal;
