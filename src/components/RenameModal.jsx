import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';

import { validate, isBlocked } from '../utils';
import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import { currentChannelSelector } from '../slices/selectors';

const RenameModal = () => {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const renameChannel = useSelector(currentChannelSelector);
  const renameChannelId = renameChannel.id;
  const channelUrl = routes.channelPath(renameChannelId);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: async (values, { setFieldError }) => {
      const newChannelName = values.message;
      const attributes = {
        name: newChannelName,
      };
      try {
        await axios.patch(channelUrl, { data: { attributes } });
        formik.resetForm();
        hideModal();
      } catch (err) {
        setFieldError('message', err.message);
      }
    },
  });

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
          <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
        <div className='form-group form-row'>
            <input
            type='text'
            id='message'
            className='form-control'
            placeholder='Type channel name'
            {...formik.getFieldProps('message')}
            />
            {formik.errors.message ? (<div className="alert alert-danger mt-3" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <Button variant='primary' type='submit' disabled={isBlocked(formik.values.message)}>
            Rename
        </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
