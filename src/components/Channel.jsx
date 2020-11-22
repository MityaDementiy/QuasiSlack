import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'react-feather';
import cn from 'classnames';

import { selectChannel, currentChannelIdSelector } from '../slices/channelsSlice';
import { openModal } from '../slices/modalsSlice';

const Channel = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannelId = useSelector(currentChannelIdSelector);

  const handleSelectChannel = (id) => () => {
    dispatch(selectChannel(parseInt(id, 10)));
  };

  const handleShowDeleteModal = () => {
    dispatch(openModal('removing'));
  };

  const handleShowRenameModal = () => {
    dispatch(openModal('renaming'));
  };

  const getClasses = (id, activeChannelId) => {
    const buttonType = activeChannelId === id ? 'primary' : 'secondary';
    const classNames = cn('btn', 'mb-3', `btn-${buttonType}`, 'btn-lg');
    return classNames;
  };

  const classes = getClasses(channel.id, currentChannelId);

  return (
    <>
      {!channel.removable && (
        <button type="button" id={channel.id} className={classes} onClick={handleSelectChannel(channel.id)}>
          {channel.name}
        </button>
      )}
      {channel.removable && (
        <div role="button" type="button" tabIndex={0} className="btn-group" onClick={handleSelectChannel(channel.id)} onKeyPress={handleSelectChannel(channel.id)} id={channel.id}>
          <button type="button" className={classes}>
            {channel.name}
          </button>
          <button type="button" className={classes} onClick={handleShowDeleteModal}>
            <Trash />
          </button>
          <button type="button" className={classes} onClick={handleShowRenameModal}>
            <Edit />
          </button>
        </div>
      )}
    </>
  );
};

export default Channel;
