import styled from 'styled-components';
import { Formik, Form, useField } from 'formik';
import useAxios from 'axios-hooks';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Color from 'color';

const ChatForm = () => {
  const handleSubmit = () => console.log('submit');

  return (
    <FormWrapper>
      <Formik
        initialValues={{
          content: ''
        }}
        validationSchema={Yup.object({
          content: Yup.string().required('Required')
        })}
        onSubmit={handleSubmit}
      >
        <Form style={formCSS}>
          <Input name="content" type="text" placeholder="Type your message..." />
          <SubmitButton type="submit">
            <Icon icon="ph:paper-plane-right-fill" />
          </SubmitButton>
        </Form>
      </Formik>
    </FormWrapper>
  );
};

export default ChatForm;

const formCSS = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '1rem'
};

const FormWrapper = styled.div`
  padding: 1rem;
`;

const SubmitButton = styled.button`
  font-size: 1.5rem;
  align-self: stretch;
  display: flex;
  align-items: center;
  background-color: ${Color('#11273d').lighten(1.5).hex()};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${Color('#11273d').lighten(3).hex()};
  }
`;

const Input = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <FormGroup>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input {...field} {...props} />
      </FormGroup>
    </>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string
};

const FormGroup = styled.div`
  display: flex;
  gap: 1rem;
  font-family: 'Montserrat';
  letter-spacing: 1px;

  & label {
    font-size: 1.7rem;
  }

  & input {
    flex-grow: 1;
    background-color: var(--light);
    padding: 1rem 2rem;
    border: 1px solid var(--dark);
    border-radius: 1rem;
    color: var(--dark);
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 1.5rem;
    min-width: 30rem;
  }
`;
