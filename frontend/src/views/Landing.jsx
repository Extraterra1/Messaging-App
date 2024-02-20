import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const Landing = () => {
  const auth = useAuthUser();
  return <h1>Hey {auth.username}</h1>;
};

export default Landing;
