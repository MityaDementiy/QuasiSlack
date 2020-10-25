import React from 'react';

const ChatRoom = ({ messages }) => {
  const renderMessages = messages.map((message) => (
      <div key={message.id}>
        <span><b>{message.user}:</b></span><span> {message.text}</span>
      </div>
  ));
  const vdom = (
    <div className='card mb-4 h-75 overflow-auto'>
      <div className='card-body h-75'>
        {renderMessages}
      </div>
    </div>
  );
  return vdom;
};

export default ChatRoom;
