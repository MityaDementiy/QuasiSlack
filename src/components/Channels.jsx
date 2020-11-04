import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Trash } from 'react-feather';
import { selectChannel } from '../features/channels/channelsSlice';
import { isRemovable } from '../utils';
import { openModal } from '../features/modals/modalsSlice';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const getClasses = (id) => {
    const buttonType = currentChannelId === id ? 'primary' : 'secondary';
    const classNames = cn('btn', 'mb-3', `btn-${buttonType}`, 'btn-lg');
    return classNames;
  };

  const handleSelectChannel = (e) => {
    e.preventDefault();
    const selectedChannelId = parseInt(e.target.id, 10);
    dispatch(selectChannel(selectedChannelId));
  };

  const handleShowDeleteModal = (e) => {
    e.preventDefault();
    const removeChannelId = e.target.id;
    dispatch(selectChannel(removeChannelId));
    dispatch(openModal('removing'));
  };

  const handleShowRenameModal = (e) => {
    e.preventDefault();
    const renameChannelId = e.target.id;
    console.log('renameChannelId', renameChannelId);
    dispatch(selectChannel(renameChannelId));
    dispatch(openModal('renaming'));
  };

  const renderChannels = channels
    .map((c) => {
      const classes = getClasses(c.id);
      if (!isRemovable(c)) {
        return (
          <button
          key={c.name}
          id={c.id}
          className={classes}
          onClick={handleSelectChannel}
          >
          {c.name}
          </button>
        );
      }
      return (
      <div className='btn-group' key={c.name}>
      <button
      id={c.id}
      className={classes}
      onClick={handleSelectChannel}
    >
      {c.name}
    </button>
    <button id={c.id} type="button" className={classes} onClick={handleShowDeleteModal}>
      {/* <Trash id={c.id}/> */} D
    </button>
    <button id={c.id} type="button" className={classes} onClick={handleShowRenameModal}>
      {/* <Edit id={c.id}/> */} R
    </button>
    </div>
      );
    });

  return (
    <div className='btn-group-vertical'>
      { renderChannels }
    </div>
  );
};

export default Channels;
