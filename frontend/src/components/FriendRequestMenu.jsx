import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const FriendRequestMenu = ({ isOpen, closeModal }) => {
  const authHeader = useAuthHeader();

  const [{ loading, data }] = useAxios({
    url: `${import.meta.env.VITE_API_URL}/users/search`,
    method: 'POST',
    headers: { Authorization: authHeader }
  });

  return (
    <div style={{ position: 'absolute' }} onClick={(e) => e.stopPropagation()}>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
        <ModalContainer>
          <h1>Pending Friend Requests</h1>
          <div className="body" />
        </ModalContainer>
      </Modal>
    </div>
  );
};

FriendRequestMenu.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem;
  min-height: 50vh;
  & h1 {
    font-weight: 700;
    font-family: 'Montserrat';
    font-size: 4rem;
    letter-spacing: 3px;
  }
  & > .body {
    flex-grow: 1;

    display: flex;
    justify-content: center;
    width: 100%;
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

export default FriendRequestMenu;
