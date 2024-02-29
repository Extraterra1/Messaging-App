import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FriendsMenu = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
      <ModalContainer>
        <h1>Are you sure you want to delete </h1>
      </ModalContainer>
    </Modal>
  );
};

FriendsMenu.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  item: PropTypes.object,
  refetchPosts: PropTypes.func
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  & h1 {
    font-weight: 400;
  }
  & .actions {
    margin: 0 auto;
    margin-top: 5rem;
    display: flex;
    gap: 5rem;
  }
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

export default FriendsMenu;
