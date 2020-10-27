import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Channels from './Channels';
import ChatRoom from './ChatRoom';
import MessageForm from './MessageForm';

const App = ({ channels, currentChannelId, messages }) => (
  <Container fluid>
    <Row className='vh-100'>
      <Col sm={2}>
        <h5>Channels</h5>
        <Channels channels={channels} currentChannelId={currentChannelId} />
      </Col>
      <Col sm={10}>
        <ChatRoom messages={messages} />
        <MessageForm currentChannelId={currentChannelId} />
      </Col>
    </Row>
  </Container>
);

export default App;
