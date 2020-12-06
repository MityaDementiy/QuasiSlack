import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AddChannelModalButton from './AddChannelModalButton';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';
import Channels from './Channels';
import MessageForm from './MessageForm';
import Messages from './Messages';
import { modalSelector } from '../slices/modalsSlice';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

const getModal = (action) => modals[action];

const App = () => {
  const modal = useSelector(modalSelector);
  const ModalComponent = getModal(modal);
  const { t } = useTranslation();

  return (
    <Container>
      <Row className="vh-100">
        <Col sm={12} md={4} lg={3}>
          <Row>
            <Col className="mb-3 d-flex justify-content-between">
              <h5>{t('interfaceTexts.channelsListHeader')}</h5>
              <AddChannelModalButton />
            </Col>
          </Row>
          <Row className="h-50 overflow-auto">
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
