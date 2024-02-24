import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Icon } from '@iconify/react';

import CircleLetter from './CircleLetter';

const Chatroom = ({ chat }) => {
  const auth = useAuthUser();

  // TODO: Refactor with function
  const chatLetter = chat
    ? chat.title
      ? chat.title.at(0)
      : chat.participants
          .filter((e) => e._id !== auth._id)[0]
          .username.at(0)
          .toUpperCase()
    : null;

  return (
    <>
      {!chat ? (
        <EmptyMessage />
      ) : (
        <ChatroomContainer>
          <div className="chat-header">
            <CircleLetter>{chatLetter}</CircleLetter>
            <div className="chat-title">
              <span>Chat with yo mama</span>
            </div>
            <div className="chat-actions">
              <Icon icon="ph:dots-three-outline-vertical-fill" />
            </div>
          </div>
          <div className="chat-body">Body</div>
          <div className="chat-form">Form</div>
        </ChatroomContainer>
      )}
    </>
  );
};

Chatroom.propTypes = {
  chat: PropTypes.object
};

export default Chatroom;

const ChatroomContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > .chat-header {
    display: flex;
    padding: 1rem 2rem;
    background-color: var(--dark);
    border-left: 1px solid black;

    align-items: center;
    justify-content: space-between;

    & > .chat-title {
      flex-grow: 1;

      font-size: 2rem;
      font-weight: 700;
      padding-inline-start: 1rem;
    }

    & > .chat-actions {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      padding: 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: var(--gray);
      }
    }
  }
`;

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
