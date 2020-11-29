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
    dispatch(selectChannel(id));
  };

  const handleShowDeleteModal = () => {
    dispatch(openModal('removing'));
  };

  const handleShowRenameModal = () => {
    dispatch(openModal('renaming'));
  };

  const classNames = cn('btn', 'mb-3', 'btn-lg', {
    'btn-primary': currentChannelId === channel.id,
    'btn-secondary': currentChannelId !== channel.id,
  });

  if (channel.removable) {
    return (
      <div role="button" type="button" tabIndex={0} className="btn-group" onClick={handleSelectChannel(channel.id)} onKeyPress={handleSelectChannel(channel.id)} id={channel.id}>
        <button type="button" className={classNames}>
          {channel.name}
        </button>
        <button type="button" className={classNames} onClick={handleShowDeleteModal}>
          <Trash />
        </button>
        <button type="button" className={classNames} onClick={handleShowRenameModal}>
          <Edit />
        </button>
      </div>
    );
  }
  return (
    <button type="button" id={channel.id} className={classNames} onClick={handleSelectChannel(channel.id)}>
      {channel.name}
    </button>
  );
};

export default Channel;
