import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'react-feather';

import { selectChannel, currentChannelIdSelector } from '../slices/channelsSlice';
import { isRemovable, getClasses } from '../utils';
import { openModal } from '../slices/modalsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(currentChannelIdSelector);

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

  const handleShowDeleteModal = () => {
    dispatch(openModal('removing'));
  };

  const handleShowRenameModal = () => {
    dispatch(openModal('renaming'));
  };

  const classes = getClasses(channel.id, currentChannelId);

  if (!isRemovable(channel)) {
    return (
      <button type="button" id={channel.id} className={classes} onClick={handleSelectChannel}>
        {channel.name}
      </button>
    );
  }
  return (
    <div role="button" type="button" tabIndex={0} className="btn-group" onClick={handleSelectChannel} onKeyPress={handleSelectChannel} id={channel.id}>
      <button type="button" className={`${classes}, w-50`}>
        {channel.name}
      </button>
      <button type="button" className={classes} onClick={handleShowDeleteModal}>
        <Trash />
      </button>
      <button type="button" className={classes} onClick={handleShowRenameModal}>
        <Edit />
      </button>
    </div>
  );
};

export default Channel;
