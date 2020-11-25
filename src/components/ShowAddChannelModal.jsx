import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { openModal } from '../slices/modalsSlice';

const ShowAddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClick = () => {
    dispatch(openModal('adding'));
  };

  return (
    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleClick}>{t('interfaceTexts.addChannelButton')}</button>
  );
};

export default ShowAddChannelModal;
