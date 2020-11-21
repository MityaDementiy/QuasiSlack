import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { validate, isBlocked } from '../utils';
import { closeModal } from '../slices/modalsSlice';
import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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
        formik.resetForm();
        await axios.patch(channelUrl, { data: { attributes } });
        hideModal();
      } catch (err) {
        setFieldError('message', err.message);
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
              id="message"
              className="form-control"
              placeholder={t('interfaceTexts.modalFormPlaceholder')}
              onChange={formik.handleChange}
              value={formik.values.message}
              ref={renameModalInputRef}
            />
            {formik.errors.message ? (<div className="alert alert-danger mt-3" role="alert">{formik.errors.message}</div>) : null}
          </div>
          <Button variant="primary" type="submit" disabled={isBlocked(formik.values.message)}>
            {t('interfaceTexts.renameButton')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
