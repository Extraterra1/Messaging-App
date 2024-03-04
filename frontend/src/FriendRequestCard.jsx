import styled from 'styled-components';
import PropTypes from 'prop-types';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Icon } from '@iconify/react';
import useAxios from 'axios-hooks';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';

import CircleLetter from './CircleLetter';

const FriendRequestCard = ({ friendRequest }) => {
  const auth = useAuthUser();
  const [status, setStatus] = useState('pending');
  const authHeader = useAuthHeader();

  const user = friendRequest.recipient.username === auth.username ? friendRequest.sender : friendRequest.recipient;

  const [{ loading, data }, resolveFriendRequest] = useAxios({ method: 'PATCH', headers: { Authorization: authHeader } }, { manual: true });

  const handleAccept = async () => {
    try {
      if (status !== 'pending') return;
      await toast.promise(
        resolveFriendRequest({ url: `${import.meta.env.VITE_API_URL}/friendRequests/${friendRequest._id}/accept` }),
        {
          loading: 'Accepting Friend Request...',
          success: `You and ${user.username} are now friends`,
          error: 'Something went wrong'
        },
        { success: { duration: 5000 }, id: 'frSent' }
      );
      setStatus('accepted');
    } catch (err) {
      console.log(err);
    }
  };
  const handleDecline = async () => {
    try {
      if (status !== 'pending') return;
      await toast.promise(
        resolveFriendRequest({ url: `${import.meta.env.VITE_API_URL}/friendRequests/${friendRequest._id}/decline` }),
        {
          loading: 'Declining Friend Request...',
          success: 'Friend Request Declined',
          error: 'Something went wrong'
        },
        { success: { duration: 5000 }, id: 'frSent' }
      );
      setStatus('declined');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <CircleLetter>{user.username.at(0).toUpperCase()}</CircleLetter>
      <span className="username">{user.username}</span>
      {!loading && status === 'pending' ? (
        <div className="actions">
          <Icon onClick={handleAccept} className="add-friend-icon icon" icon="ph:check-bold" />
          <Icon onClick={handleDecline} className="add-friend-icon icon" icon="ph:x-bold" />
        </div>
      ) : null}
      <BeatLoader loading={loading} color="var(--light)" size={5} />
    </Container>
  );
};

FriendRequestCard.propTypes = {
  friendRequest: PropTypes.object
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

    &:hover {
      color: var(--info);
    }
  }

  & > .friends {
    color: var(--gray);
    cursor: auto;

    &:hover {
      color: var(--gray);
    }
  }

  & > .fr-sent {
    color: var(--success);
    cursor: auto;

    &:hover {
      color: var(--success);
    }
  }
`;

export default FriendCard;
