import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const messages = useSelector((state) => state.messages.messages);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannelMessages = messages
    .filter((message) => message.channelId === currentChannelId);

  const renderMessages = currentChannelMessages.map((message) => (
      <div key={message.id}>
        <span><b>{message.user}:</b></span><span> {message.text}</span>
      </div>
  ));

  return (
    <div className='card mb-4 h-50 overflow-auto'>
      <div className='card-body h-50 overflow-auto'>
        {renderMessages}
      </div>
    </div>
  );
};

export default Messages;