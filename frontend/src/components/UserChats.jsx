import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { useEffect } from 'react';

import ChatPreview from './ChatPreview';

const UserChats = ({ setActiveChatroom, user, setChatrooms }) => {
  const authHeader = useAuthHeader();

  const [{ data, loading }] = useAxios({
    url: `${import.meta.env.VITE_API_URL}/users/${user._id}/chatrooms`,
    method: 'GET',
    headers: { Authorization: authHeader }
  });

  useEffect(() => {
    setChatrooms(data?.chatrooms);
  }, [data]);

  return (
    <Container>
      {!loading && data.chatrooms.length === 0 ? <h3>Nothing to see here...</h3> : null}
      {loading ? (
        <ClipLoader cssOverride={{ display: 'block', margin: '0 auto' }} color="var(--light)" size={75} />
      ) : (
        data.chatrooms.map((e) => <ChatPreview setActiveChatroom={setActiveChatroom} key={e._id} chatroom={e} />)
      )}
    </Container>
  );
};

UserChats.propTypes = {
  setActiveChatroom: PropTypes.func,
  user: PropTypes.object,
  setChatrooms: PropTypes.func
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
