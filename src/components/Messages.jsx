import React from 'react';
import { useSelector } from 'react-redux';

import { currentChannelMessagesSelector } from '../slices/messagesSlice';

const renderMessage = (message) => (
  <div key={message.id}>
    <span>
      <b>
        {`${message.user}:`}
      </b>
    </span>
    <span>
      {' '}
      {message.text}
    </span>
  </div>
);

const Messages = () => {
  const currentChannelMessages = useSelector(currentChannelMessagesSelector);

  return (
    <div className="card mb-4 h-50 overflow-auto">
      <div className="card-body h-50 overflow-auto">
        {currentChannelMessages.map(renderMessage)}
      </div>
    </div>
  );
};

export default Messages;
