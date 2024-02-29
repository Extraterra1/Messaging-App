import styled from 'styled-components';
import { Icon } from '@iconify/react';

const ActionsMenu = () => {
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
  `;

  return (
    <Container>
      <div>
        <Icon icon="ph:user-circle-plus-fill" />
        <span>Add Friend</span>
      </div>
    </Container>
  );
};

export default ActionsMenu;
