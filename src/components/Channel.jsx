import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'react-feather';

import { selectChannel } from '../slices/channelsSlice';
import { isRemovable, getClasses } from '../utils';
import { openModal } from '../slices/modalsSlice';
import { currentChannelSelector } from '../slices/selectors';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(currentChannelSelector);
  const currentChannelId = currentChannel.id;

  const handleSelectChannel = (e) => {
    e.preventDefault();
    const targetElement = e.target;
    if (targetElement.innerHTML === 'general' || targetElement.innerHTML === 'random') {
      dispatch(selectChannel(parseInt(targetElement.id, 10)));
    } else {
      const closestButtonGroup = targetElement.closest('.btn-group');
      dispatch(selectChannel(parseInt(closestButtonGroup.id, 10)));
    }
  };

  const handleShowDeleteModal = (e) => {
    e.preventDefault();
    dispatch(openModal('removing'));
  };

  const handleShowRenameModal = (e) => {
    e.preventDefault();
    dispatch(openModal('renaming'));
  };

  const classes = getClasses(channel.id, currentChannelId);

  if (!isRemovable(channel)) {
    return (
      <button
      id={channel.id}
      className={classes}
      onClick={handleSelectChannel}
      >
      {channel.name}
      </button>
    );
  }
  return (
    <div className='btn-group' onClick={handleSelectChannel} id={channel.id}>
      <button className={`${classes}, w-50`}>
        {channel.name}
      </button>
      <button className={classes} onClick={handleShowDeleteModal}>
        <Trash />
      </button>
      <button className={classes} onClick={handleShowRenameModal}>
        <Edit />
      </button>
    </div>
  );
};

export default Channel;
