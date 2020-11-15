import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import i18next from 'i18next';

import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const deleteChannelId = useSelector(currentChannelIdSelector);
  const channelUrl = routes.channelPath(deleteChannelId);

  const [error, setError] = React.useState(null);

  const handleDelete = async () => {
    const data = {
      type: 'channels',
      id: deleteChannelId,
    };

    try {
      await axios.delete(channelUrl, { data });
      hideModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
  <Modal.Title>{i18next.t('interfaceTexts.removeModalHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
  <p>{i18next.t('interfaceTexts.removeModalWarning')}</p>
          <Button variant='secondary' type='reset' block onClick={hideModal}>
            {i18next.t('interfaceTexts.cancelButton')}
          </Button>
          <Button variant='danger' type='submit' block onClick={handleDelete}>
          {i18next.t('interfaceTexts.confirmButton')}
          </Button>
          { error && <div className="alert alert-danger mt-3" role="alert">{error}</div> }
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
