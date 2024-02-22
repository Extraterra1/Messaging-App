import useAxios from 'axios-hooks';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

import ChatPreview from './ChatPreview';

const UserChats = ({ user }) => {
  const authHeader = useAuthHeader();
  const [{ data, loading }, refetch] = useAxios({
    url: `${import.meta.env.VITE_API_URL}/users/${user._id}/chatrooms`,
    method: 'GET',
    headers: { Authorization: authHeader }
  });

  if (data) console.log(data);

  return (
    <Container>
      {loading ? (
        <ClipLoader cssOverride={{ display: 'block', margin: '0 auto' }} color="var(--light)" size={75} />
      ) : (
        data.chatrooms.map((e) => <ChatPreview key={e._id} chatroom={e} />)
      )}
    </Container>
  );
};

export default UserChats;

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem 0;
`;
