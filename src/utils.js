import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';

export const validate = (values) => {
  const errors = {};
  if (!values.message) {
    errors.message = 'You can not submit empty field';
  }

  return errors;
};

const createUserName = () => faker.name.findName();

export const getUserName = () => Cookies.get('userName');

export const setUserName = () => Cookies.set('userName', createUserName());

export const UserContext = React.createContext();

export const isRemovable = (channel) => channel.removable;

export const createFakeKey = () => faker.lorem.word();
