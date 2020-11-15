import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import i18next from 'i18next';

import { validate, UserContext, isBlocked } from '../utils';
import routes from '../routes';
import { currentChannelIdSelector } from '../slices/channelsSlice';

const MessageForm = () => {
  const userName = React.useContext(UserContext);
  const currentChannelId = useSelector(currentChannelIdSelector);
  const channelUrl = routes.channelMessagesPath(currentChannelId);

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
        await axios.post(channelUrl, { data: { attributes } });
        formik.resetForm();
      } catch (err) {
        setFieldError('message', err.message);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='form-group form-row'>
        <div className='col-10'>
          <input
            type='text'
            id='message'
            className='form-control'
            placeholder={i18next.t('interfaceTexts.messageFormPlaceholder')}
            {...formik.getFieldProps('message')}
          />
          {formik.errors.message ? (<div className="alert alert-danger mt-3" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <div className='col-2'>
  <button type='submit' className='btn btn-primary btn-block' disabled={isBlocked(formik.values.message)}>{i18next.t('interfaceTexts.submitButton')}</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
