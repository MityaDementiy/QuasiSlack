import React from 'react';

const ChatRoom = ({ messages }) => {
  const renderMessages = messages.map((message) => (
      <div key={message.id}>
        <span><b>{message.user}:</b></span><span> {message.text}</span>
      </div>
  ));
  const vdom = (
    <div className='card mb-4 h-50'>
      <div className='card-body h-50 overflow-auto'>
        {renderMessages}
      </div>
    </div>
  );
  return vdom;
};

export default ChatRoom;
