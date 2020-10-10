import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const App = ({ channels }) => {
  const renderChannels = (channels) => {
    return channels.map((channel) => <li key={channel.name}><a href='#'>{channel.name}</a></li>);
  };
    
  return (
    <Container fluid>
      <Row>
        <Col sm={4}><h3>Channels</h3>
          <ul>
            {renderChannels(channels)}
          </ul>
        </Col>
        <Col sm={8}><h3>Chat</h3></Col>
      </Row>
    </Container>
  )
};

export default App;