import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddChannelButton from './AddChannelButton';
import Channels from './Channels';
import ChatRoom from './ChatRoom';
import MessageForm from './MessageForm';

const App = () => (
  <Container fluid>
    <Row className='vh-100'>
      <Col sm={2}>
        <h5>Channels</h5>
        <Channels />
        <AddChannelButton />
      </Col>
      <Col sm={10}>
        <ChatRoom />
        <MessageForm />
      </Col>
    </Row>
  </Container>
);

export default App;
