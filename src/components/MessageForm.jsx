import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { validate, UserContext } from '../utils';

const MessageForm = ({ currentChannelId }) => {
  const userName = React.useContext(UserContext);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validate,
    // надо реализовать асинхронную отправку сообщений
    onSubmit: async (values) => {
      const messageText = values.message;
      const message = {
        user: userName,
        text: messageText,
      };
      console.log(message);
      formik.resetForm();
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
            placeholder='Type message'
            {...formik.getFieldProps('message')}
          />
          {formik.errors.message ? (<div className="alert alert-danger" role="alert">{formik.errors.message}</div>) : null}
        </div>
        <div className='col-2'>
          <button type='submit' className='btn btn-primary btn-block'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;
