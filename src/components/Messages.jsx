import React from 'react';
import { useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';

import { currentChannelMessagesSelector } from '../slices/messagesSlice';

const renderMessage = ({ id, user, text }) => (
  <div key={id}>
    <span>
      <b>
        {`${user}:`}
      </b>
    </span>
    <span>
      {' '}
      {text}
    </span>
  </div>
);

const Messages = () => {
  const currentChannelMessages = useSelector(currentChannelMessagesSelector);

  const messagesAreaId = 'messagesArea';
  React.useEffect(() => {
    scroll.scrollToBottom({
      duration: 0,
      containerId: messagesAreaId,
    });
  });

  return (
    <div className="card mb-4 h-50 overflow-auto">
      <div id="messagesArea" className="card-body h-50 overflow-auto">
        {currentChannelMessages.map(renderMessage)}
      </div>
    </div>
  );
};

export default Messages;
