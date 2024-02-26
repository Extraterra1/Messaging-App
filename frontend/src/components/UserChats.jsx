import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ChatPreview from './ChatPreview';

const UserChats = ({ setActiveChatroom, loading, chatrooms }) => {
  return (
    <Container>
      {!loading && chatrooms.length === 0 ? <h3>Nothing to see here...</h3> : null}
      {loading ? (
        <ClipLoader cssOverride={{ display: 'block', margin: '0 auto' }} color="var(--light)" size={75} />
      ) : (
        chatrooms.map((e) => <ChatPreview setActiveChatroom={setActiveChatroom} key={e._id} chatroom={e} />)
      )}
    </Container>
  );
};

UserChats.propTypes = {
  setActiveChatroom: PropTypes.func,
  user: PropTypes.object,
  setChatrooms: PropTypes.func,
  chatrooms: PropTypes.array,
  loading: PropTypes.bool
};

export default UserChats;

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 0;

  & > h3 {
    text-align: center;
    margin-top: 2rem;
    font-size: 2rem;
  }
`;
