import Cookies from 'js-cookie';
import faker from 'faker';
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';
import i18next from 'i18next';

const isCensoredWordInMessage = (message, censored) => {
  const intersection = _.intersection(message, censored);
  return intersection.length > 0;
};

export const validate = (values) => {
  const errors = {};
  const censoredWords = ['дурак', 'балбес', 'придурок'];
  const messageWords = values.message.split(' ');
  if (isCensoredWordInMessage(messageWords, censoredWords)) {
    errors.message = i18next.t('alertMessages.censoredWords');
  }

  return errors;
};

const createUserName = () => faker.name.findName();

export const getUserName = () => Cookies.get('userName');

export const setUserName = () => Cookies.set('userName', createUserName());

export const UserContext = React.createContext();

export const isRemovable = (channel) => channel.removable;

export const isBlocked = (value) => value === '';

export const getClasses = (id, currentChannelId) => {
  const buttonType = currentChannelId === id ? 'primary' : 'secondary';
  const classNames = cn('btn', 'mb-3', `btn-${buttonType}`, 'btn-lg');
  return classNames;
};
