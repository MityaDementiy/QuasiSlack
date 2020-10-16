import React from "react";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Message is required';
  } 

  return errors;
};

const MessageForm = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    }, 
    validate,
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
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
        {formik.errors.message ? (
         <div>{formik.errors.message}</div>) : null}
        </div>
        <div className='col-2'>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;