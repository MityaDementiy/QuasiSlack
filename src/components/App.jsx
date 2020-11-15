import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

import AddChannelButton from './AddChannelButton';
import AddModal from './AddModal';
import RemoveModal from './RemoveModal';
import RenameModal from './RenameModal';
import Channels from './Channels';
import MessageForm from './MessageForm';
import Messages from './Messages';

const modals = {
  adding: AddModal,
  removing: RemoveModal,
  renaming: RenameModal,
};

const getModal = (action) => modals[action];

const App = () => {
  const modal = useSelector((state) => state.modals.modalType);
  const ModalComponent = getModal(modal);

  return (
    <Container fluid>
      <Row className='vh-100'>
        <Col sm={12} md={4} lg={3}>
          <Row>
            <Col className='mb-3 d-flex justify-content-between'>
              <h5>{i18next.t('interfaceTexts.channelsListHeader')}</h5>
              <AddChannelButton />
            </Col>
          </Row>
          <Row>
            <Col>
              <Channels />
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={8} lg={9}>
          {modal && <ModalComponent />}
          <Messages />
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
