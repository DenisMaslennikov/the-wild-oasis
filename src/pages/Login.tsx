import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.tsx";
import Logo from "../ui/Logo.tsx";
import Heading from "../ui/Heading.tsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login in to you account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
