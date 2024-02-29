import Modal from 'react-modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';

const FriendsMenu = ({ isOpen, closeModal }) => {
  return (
    <div style={{ position: 'absolute' }} onClick={(e) => e.stopPropagation()}>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={modalStyles}>
        <ModalContainer>
          <h1>Add new Friends</h1>
          <div className="form">
            <Formik
              initialValues={{
                username: ''
              }}
              validationSchema={Yup.object({
                username: Yup.string().required('Required')
              })}
              onSubmit={() => console.log('xd')}
            >
              <Form>
                <Input label="Username" name="username" id="username" type="text" placeholder="XxVampireSlayerxX" />
              </Form>
            </Formik>
          </div>
        </ModalContainer>
      </Modal>
    </div>
  );
};

FriendsMenu.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  item: PropTypes.object,
  refetchPosts: PropTypes.func
};

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  min-height: 50vh;
  & h1 {
    font-weight: 700;
    font-family: 'Montserrat';
    font-size: 4rem;
    letter-spacing: 3px;
  }
  & .actions {
    margin: 0 auto;
    margin-top: 5rem;
    display: flex;
    gap: 5rem;
  }
`;

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  font-family: 'Montserrat';
  letter-spacing: 1px;
  position: relative;

  & label {
    font-size: 1.7rem;
  }

  & input {
    background-color: #fff;
    padding: 1rem 2rem;
    border: 2px solid var(--success);
    border-radius: 1rem;
    color: var(--dark);
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 1.5rem;
    min-width: 30rem;
  }

  & .icon {
    font-size: 3rem;
    transition: all 0.1s;
  }

  & .search-icon {
    position: absolute;
    top: 15%;
    right: 5%;
  }
`;

const Input = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <FormGroup>
        <input {...field} {...props} />
        <Icon className="search-icon icon" icon="ph:magnifying-glass-bold" />
      </FormGroup>
    </>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

export default FriendsMenu;
