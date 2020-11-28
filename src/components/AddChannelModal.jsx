import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import SubmitChannelSchema from '../validator';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const hideModal = () => {
    dispatch(closeModal());
  };

  const channelsUrl = routes.channelsPath();
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: SubmitChannelSchema,
    isInitialValid: false,
    onSubmit: async (values, { setFieldError }) => {
      const channelName = values.name;
      const attributes = {
        name: channelName,
      };
      try {
        await axios.post(channelsUrl, { data: { attributes } });
        hideModal();
      } catch (err) {
        setFieldError('name', err.message);
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
              id="name"
              className="form-control"
              placeholder={t('interfaceTexts.modalFormPlaceholder')}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && <div className="alert alert-danger mt-3" role="alert">{formik.errors.name}</div>}
          </div>
          <Button variant="primary" type="submit" disabled={!formik.isValid || formik.isSubmitting}>
            {t('interfaceTexts.submitButton')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
