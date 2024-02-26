import styled from 'styled-components';
import PropTypes from 'prop-types';
import Color from 'color';

const ChatBubble = ({ message, direction }) => {
  if (direction === 'left') return <Bubble $left>{message.content}</Bubble>;
  return <Bubble>{message.content}</Bubble>;
};

ChatBubble.propTypes = {
  message: PropTypes.object,
  direction: PropTypes.string
};

export default ChatBubble;

const Bubble = styled.div`
  --r: 25px; /* the radius */
  --t: 30px; /* the size of the tail */

  --_d: ${(props) => (props.$left ? '0%' : '100%')};
  border-left: ${(props) => (props.$left ? 'var(--t) solid #0000' : 'inherit')};
  border-right: ${(props) => (props.$left ? 'inherit' : 'var(--t) solid #0000')};
  margin-right: ${(props) => (props.$left ? 'var(--t)' : 'inherit')};
  margin-left: ${(props) => (props.$left ? 'inherit' : 'var(--t)')};
  place-self: ${(props) => (props.$left ? 'start' : 'end')};

  max-width: 300px;
  padding: calc(2 * var(--r) / 2.5);
  mask:
    radial-gradient(var(--t) at var(--_d) 0, #0000 98%, #000 102%) var(--_d) 100% / calc(100% - var(--r)) var(--t) no-repeat,
    conic-gradient(at var(--r) var(--r), #000 75%, #0000 0) calc(var(--r) / -2) calc(var(--r) / -2) padding-box,
    radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / var(--r) var(--r) space padding-box;
  -webkit-mask:
    radial-gradient(var(--t) at var(--_d) 0, #0000 98%, #000 102%) var(--_d) 100% / calc(100% - var(--r)) var(--t) no-repeat,
    conic-gradient(at var(--r) var(--r), #000 75%, #0000 0) calc(var(--r) / -2) calc(var(--r) / -2) padding-box,
    radial-gradient(50% 50%, #000 98%, #0000 101%) 0 0 / var(--r) var(--r) space padding-box;
  background: ${Color('#11273d').lighten(1.5).hex()} border-box;
  color: #fff;
`;
