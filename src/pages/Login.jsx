import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Heading from '../ui/Heading';
import Logo from '../ui/Logo';
import useUser from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Login() {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (isAuthenticated) navigate('/dashboard');
    },
    [isAuthenticated, navigate]
  );

  if (isAuthenticated || isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return (
    <LoginLayout>
      <Logo />
      <Heading as={'h4'}>Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
