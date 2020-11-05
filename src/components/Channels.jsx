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

  const renderChannels = channels
    .map((c) => {
      const classes = getClasses(c.id);
      if (!isRemovable(c)) {
        return (
          <button
            key={`${c.name}, ${c.id}`}
            id={c.id}
            className={classes}
            onClick={handleSelectChannel}
          >
            {c.name}
          </button>
        );
      }
      return (
        <div className='btn-group' key={`${c.name}, ${c.id}`} onClick={handleSelectChannel} id={c.id}>
          <button className={`${classes}, w-50`}>
            {c.name}
          </button>
          <button className={classes} onClick={handleShowDeleteModal}>
            <Trash />
          </button>
          <button className={classes} onClick={handleShowRenameModal}>
            <Edit />
          </button>
        </div>
      );
    });

  return (
    <div className='btn-group-vertical d-block'>
      { renderChannels }
    </div>
  );
};

export default Channels;
