import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { validate, isBlocked } from '../utils';
import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';
import { modalSelector } from '../slices/modalsSlice';
import UserContext from '../Context';

const MessageForm = () => {
  const userName = React.useContext(UserContext);
  const currentChannelId = useSelector(currentChannelIdSelector);
  const channelUrl = routes.channelMessagesPath(currentChannelId);
  const modalType = useSelector(modalSelector);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    onSubmit: async (values, { setFieldError }) => {
      const messageText = values.message;
      const attributes = {
        user: userName,
        text: messageText,
      };
      try {
        formik.resetForm();
        await axios.post(channelUrl, { data: { attributes } });
      } catch (err) {
        setFieldError('message', err.message);
      }
    },
  });

  const messageInputRef = React.useRef(null);
  React.useEffect(() => {
    messageInputRef.current.focus();
  }, [currentChannelId, formik.values.message, modalType]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group form-row">
        <div className="col-9">
          <input
            type="text"
            id="message"
            className="form-control"
            placeholder={t('interfaceTexts.messageFormPlaceholder')}
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={messageInputRef}
          />
          {formik.errors.message ? (<div className="alert alert-danger mt-3" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <div className="col-3">
          <button type="submit" className="btn btn-primary btn-block" disabled={isBlocked(formik.values.message)}>{t('interfaceTexts.submitButton')}</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
