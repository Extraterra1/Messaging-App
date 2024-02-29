import styled from 'styled-components';
import PropTypes from 'prop-types';

const UsersList = ({ data }) => {
  const users = data?.users || [];
  return (
    <Container>
      {!data ? <Message>Try typing something into the search box!</Message> : null}
      {data && data.count === 0 ? <Message>There are no users that match your search</Message> : null}
      <List>
        {users.map((e) => (
          <FriendCard key={e._id} user={e} />
        ))}
      </List>
    </Container>
  );
};

UsersList.propTypes = {
  data: PropTypes.object
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Message = styled.span`
  font-size: 1.5rem;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default UsersList;
