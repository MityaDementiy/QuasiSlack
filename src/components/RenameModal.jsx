import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';

import { validate } from '../utils';
import { closeModal } from '../features/modals/modalsSlice';
import routes from '../routes';

const AddModal = () => {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const renameChannelId = useSelector((state) => state.channels.currentChannelId);
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
  const vdom = (
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
            {formik.errors.message ? (<div className="alert alert-danger" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <Button variant='primary' type='submit' disabled={formik.isSubmitting}>
            Rename
        </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
  return vdom;
};

export default AddModal;
