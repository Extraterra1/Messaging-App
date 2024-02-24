import PropTypes from 'prop-types';
import styled from 'styled-components';

const Chatroom = ({ chat }) => {
  return <>{!chat ? <EmptyMessage /> : null}</>;
};

Chatroom.propTypes = {
  chat: PropTypes.object
};

export default Chatroom;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > h2 {
    font-size: 5rem;
  }

  & > p {
    font-size: 1.7rem;
  }
`;

const EmptyMessage = () => (
  <CenterContainer>
    <h2>Welcome to ChatApp!</h2>
    <p>Click on any chat to display its messages</p>
  </CenterContainer>
);
