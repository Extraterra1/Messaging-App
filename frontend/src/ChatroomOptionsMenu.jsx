import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const ChatroomOptionsMenu = ({ setChatrooms }) => {
  return (
    <>
      <Container onClick={(e) => e.stopPropagation()}>
        <div className="remove-friend">
          <Icon icon="ph:user-minus-fill" />
          <span>Remove Friend</span>
        </div>
      </Container>
    </>
  );
};

ChatroomOptionsMenu.propTypes = {
  setChatrooms: PropTypes.func
};

export default ChatroomOptionsMenu;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--gray);
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 1.7rem;
  width: 18rem;

  margin-top: 5rem;

  position: absolute;
  top: 0;
  right: 0;
  user-select: none;

  & > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 0.25rem;
    padding: 1rem;

    &:hover {
      background-color: var(--gray-light);
    }
  }

  & > .remove-friend {
    position: relative;
  }
`;
