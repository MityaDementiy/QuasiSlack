import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import AddChannelButton from './AddChannelButton';
import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';
import Channels from './Channels';
import ChatRoom from './ChatRoom';
import MessageForm from './MessageForm';

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

const getModal = (action) => modals[action];

const App = () => {
  const modal = useSelector((state) => state.modals.modalType);
  const ModalComponent = getModal(modal);
  const vdom = (
    <Container fluid>
      <Row className='vh-100'>
        <Col sm={3}>
          <Row>
            <Col className='mb-3 d-flex justify-content-between'>
              <h5>Channels</h5>
              <AddChannelButton />
            </Col>
          </Row>
          <Channels />
        </Col>
        <Col sm={9}>
          {modal && <ModalComponent />}
          <ChatRoom />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
  return vdom;
};

export default App;
