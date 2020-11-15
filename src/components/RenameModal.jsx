import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import i18next from 'i18next';

import { validate, isBlocked } from '../utils';
import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';

const RenameModal = () => {
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const renameChannelId = useSelector(currentChannelIdSelector);
  const channelUrl = routes.channelPath(renameChannelId);

  const renameModalInputRef = React.useRef(null);
  React.useEffect(() => {
    renameModalInputRef.current.focus();
  });

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
  <Modal.Title>{i18next.t('interfaceTexts.renameModalHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
        <div className='form-group form-row'>
            <input
            type='text'
            id='message'
            className='form-control'
            placeholder={i18next.t('interfaceTexts.modalFormPlaceholder')}
            {...formik.getFieldProps('message')}
            ref={renameModalInputRef}
            />
            {formik.errors.message ? (<div className="alert alert-danger mt-3" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <Button variant='primary' type='submit' disabled={isBlocked(formik.values.message)}>
            {i18next.t('interfaceTexts.renameButton')}
        </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
