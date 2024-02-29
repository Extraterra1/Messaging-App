import styled from 'styled-components';
import PropTypes from 'prop-types';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Icon } from '@iconify/react';

import CircleLetter from './CircleLetter';

const FriendCard = ({ user }) => {
  const auth = useAuthUser();

  return (
    <Container>
      <CircleLetter>{user.username.at(0)}</CircleLetter>
      <span className="username">{user.username}</span>
      <Icon className="add-friend-icon icon" icon="ph:user-plus-fill" />
    </Container>
  );
};

FriendCard.propTypes = {
  user: PropTypes.object
};

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2rem;
  border-radius: 0.5rem;

  background-color: var(--dark);
  color: var(--light);
  font-size: 1.4rem;
  padding: 1rem;

  & > span.username {
    flex-grow: 1;
  }

  & > .add-friend-icon {
    font-size: 3rem;
    cursor: pointer;
    transition: all 0.3s;
  }
`;

export default FriendCard;
