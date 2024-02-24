import PropTypes from 'prop-types';

const Chatroom = ({ chat }) => {
  return <h1>{JSON.stringify(chat)}</h1>;
};

Chatroom.propTypes = {
  chat: PropTypes.object
};

export default Chatroom;
