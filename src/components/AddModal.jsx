import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { validate } from '../utils';
import { closeModal } from '../features/modals/modalsSlice';

const AddModal = () => {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
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
