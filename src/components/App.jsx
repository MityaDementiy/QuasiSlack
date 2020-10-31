import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddChannelButton from './AddChannelButton';
import AddModal from './AddModal';
import Channels from './Channels';
import ChatRoom from './ChatRoom';
import MessageForm from './MessageForm';

const modals = {
  adding: AddModal,
  // removing: Remove,
  // renaming: Rename,
};

const getModal = (action) => modals[action];

const App = () => {
  const modal = useSelector((state) => state.modals.modalType);
  const ModalComponent = getModal(modal);
  const vdom = (
    <Container fluid>
      <Row className='vh-100'>
        <Col sm={2}>
          <h5>Channels</h5>
          <Channels />
          <AddChannelButton />
        </Col>
        <Col sm={10}>
          { modal && <ModalComponent />}
          <ChatRoom />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
  return vdom;
};

export default App;
