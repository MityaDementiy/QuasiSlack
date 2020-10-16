import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatRoom from './ChatRoom';
import MessageForm from './MessageForm';

const App = ({ channels }) => {
  const renderChannels = (channels) => {
    return channels.map((channel) => <li key={channel.name}><a href='#'>{channel.name}</a></li>);
  };
    
  return (
    <Container fluid>
      <Row className='vh-100'>
        <Col sm={2}>
          <h3>Channels</h3>
          <ul>
            {renderChannels(channels)}
          </ul>
        </Col>
        <Col sm={10}>
          <ChatRoom />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  )
};

export default App;