import Cookies from 'js-cookie';
import faker from 'faker';

const createUserName = () => faker.name.findName();

export const getUserName = () => Cookies.get('userName');

export const setUserName = () => Cookies.set('userName', createUserName());

export const isRemovable = (channel) => channel.removable;
