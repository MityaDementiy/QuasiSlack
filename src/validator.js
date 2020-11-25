import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short, minimum length is 3 symbols!')
    .max(10, 'Too long, maximum length is 10 symbols!')
    .required('Required'),
});
