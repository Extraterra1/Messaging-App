import PropTypes from 'prop-types';
import styled from 'styled-components';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Icon } from '@iconify/react';
import getChatroomLetter from '../utils/getChatroomLetter';
import getChatroomTitle from '../utils/getChatroomTitle';

import CircleLetter from './CircleLetter';
import ChatBubble from './ChatBubble';

const Chatroom = ({ chat }) => {
  const auth = useAuthUser();

  const chatLetter = getChatroomLetter(chat, auth);
  const chatTitle = getChatroomTitle(chat, auth);

  return (
    <>
      {!chat ? (
        <EmptyMessage />
      ) : (
        <ChatroomContainer>
          <div className="chat-header">
            <CircleLetter>{chatLetter}</CircleLetter>
            <div className="chat-title">
              <span>{chatTitle}</span>
            </div>
            <div className="chat-actions">
              <Icon icon="ph:dots-three-outline-vertical-fill" />
            </div>
          </div>
          <div className="chat-body">
            {chat.messages.map((e) => (
              <ChatBubble direction={e.author._id.toString() === auth._id.toString() ? 'right' : 'left'} key={e._id} message={e} />
            ))}
          </div>
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
