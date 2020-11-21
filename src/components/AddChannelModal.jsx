import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { validate, isBlocked } from '../utils';
import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const hideModal = () => {
    dispatch(closeModal());
  };

  const addModalInputRef = React.useRef(null);
  React.useEffect(() => {
    addModalInputRef.current.focus();
  });

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
        formik.resetForm();
        await axios.post(channelsUrl, { data: { attributes } });
        hideModal();
      } catch (err) {
        setFieldError('message', err.message);
      }
    },
  });

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('interfaceTexts.addModalHeader')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group form-row">
            <input
              type="text"
              id="message"
              className="form-control"
              placeholder={t('interfaceTexts.modalFormPlaceholder')}
              onChange={formik.handleChange}
              value={formik.values.message}
              ref={addModalInputRef}
            />
            {formik.errors.message ? (<div className="alert alert-danger" role="alert">{formik.errors.message}</div>) : null}
          </div>
          <Button variant="primary" type="submit" disabled={isBlocked(formik.values.message)}>
            {t('interfaceTexts.submitButton')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
