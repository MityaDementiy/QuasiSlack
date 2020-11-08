import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';

const RemoveModal = () => {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const deleteChannelId = useSelector((state) => state.channels.currentChannelId);
  const channelUrl = routes.channelPath(deleteChannelId);

  const handleDelete = async () => {
    const data = {
      type: 'channels',
      id: deleteChannelId,
    };

    try {
      await axios.delete(channelUrl, { data });
      hideModal();
    } catch (err) {
      console.log(err.message);
    }
  };

  const vdom = (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Are you sure? This will delete channel with all messages.</p>
          <Button variant='secondary' type='reset' block onClick={hideModal}>
            Cancel
          </Button>
          <Button variant='danger' type='submit' block onClick={handleDelete}>
            Confirm
          </Button>
      </Modal.Body>
    </Modal>
  );
  return vdom;
};

export default RemoveModal;
