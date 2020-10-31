import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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
  const channelsUrl = routes.channelsPath();
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: async (values, { setFieldError }) => {
      const channelName = values.message;
      const attributes = {
        name: channelName,
      };
      try {
        await axios.post(channelsUrl, { data: { attributes } });
        formik.resetForm();
        hideModal();
      } catch (err) {
        setFieldError('message', err.message);
      }
      formik.resetForm();
    },
  });
  const vdom = (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
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
            Submit
              </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
  return vdom;
};

export default AddModal;
