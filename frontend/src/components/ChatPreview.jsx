import styled from 'styled-components';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import CircleLetter from './CircleLetter';

const ChatPreview = ({ chatroom }) => {
  const auth = useAuthUser();
  const chatLetter = chatroom.title
    ? chatroom.title.at(0)
    : chatroom.participants
        .filter((e) => e._id !== auth._id)[0]
        .username.at(0)
        .toUpperCase();
  const lastMessage = chatroom.messages[0] ? (
    <span>
      {chatroom.messages[0].author.username}: {chatroom.messages[0].content}
    </span>
  ) : null;

  return (
    <Container>
      <CircleLetter>{chatLetter}</CircleLetter>
      <Content>
        <div className="title">{chatroom.title || chatroom.participants.filter((e) => e._id !== auth._id)[0].username}</div>
        <div className="last-message">{lastMessage || 'No messages here yet...'}</div>
      </Content>
    </Container>
  );
};

export default ChatPreview;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  gap: 2rem;
  cursor: pointer;
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--gray);
  }
`;

const Content = styled.div`
  display: grid;
  align-self: center;

  & > .title {
    font-weight: 700;
    font-size: 1.7rem;
  }

  & > .last-message {
    font-size: 1.7rem;
  }
`;
