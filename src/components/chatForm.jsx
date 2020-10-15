import React from "react";
import { useFormik } from "formik";

const MessageForm = () => {
  const formik = useFormik({
    initialValues: {
      message: '',
    }, 
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='form-group form-row'>
        <div className='col'>
        <input 
          type='text'
          id='message'
          className='form-control'
          placeholder='Type message'
          {...formik.getFieldProps('message')}
        />
        </div>
        <div className='col'>
          <button type='submit' className='btn btn-primary'>Submit</button>
        </div>
      </div>
    </form>
  );
};

export default MessageForm;