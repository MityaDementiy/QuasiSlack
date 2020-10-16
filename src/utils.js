import Cookies from 'js-cookie';
import faker from 'faker';

export const validate = (values) => {
    const errors = {};
    if (!values.message) {
        errors.message = 'Message is required';
    }

    return errors;
};

const createUserName = () => faker.name.findName();

export const getUserName = () => Cookies.get('userName');

export const setUserName = () => {
    if (!getUserName()) {
        return Cookies.set('userName', createUserName());
    }
    return;
};
