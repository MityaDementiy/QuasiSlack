import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import { currentChannelSelector } from '../slices/channelsSlice';
import { SubmitChannelSchema } from '../validator';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const hideModal = () => {
    dispatch(closeModal());
  };
  const targetChannel = useSelector(currentChannelSelector);
  const { id: targetChannelId, name: targetChannelName } = targetChannel;
  const channelUrl = routes.channelPath(targetChannelId);

  const formik = useFormik({
    initialValues: {
      name: targetChannelName,
    },
    validationSchema: SubmitChannelSchema,
    onSubmit: async (values, { setFieldError }) => {
      const newChannelName = values.name;
      const attributes = {
        name: newChannelName,
      };
      try {
        await axios.patch(channelUrl, { data: { attributes } });
        hideModal();
      } catch (err) {
        setFieldError('name', err.message);
      }
    },
  });

  return (
    <Modal show onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('interfaceTexts.renameModalHeader')}</Modal.Title>
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
          <Button variant="primary" type="submit" disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}>
            {t('interfaceTexts.renameButton')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
