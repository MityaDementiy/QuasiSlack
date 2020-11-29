import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const targetChannelId = useSelector(currentChannelIdSelector);
  const channelUrl = routes.channelPath(targetChannelId);

  const [error, setError] = React.useState(null);

  const handleDelete = async () => {
    const data = {
      type: 'channels',
      id: targetChannelId,
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
        <Modal.Title>{t('interfaceTexts.removeModalHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('interfaceTexts.removeModalWarning')}</p>
        <Button variant="secondary" type="reset" block onClick={hideModal}>
          {t('interfaceTexts.cancelButton')}
        </Button>
        <Button variant="danger" type="submit" block onClick={handleDelete}>
          {t('interfaceTexts.confirmButton')}
        </Button>
        { error && <div className="alert alert-danger mt-3" role="alert">{error}</div> }
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
