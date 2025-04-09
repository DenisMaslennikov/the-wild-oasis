import { PropsWithChildren, useEffect } from "react";
import useUser from "../features/authentication/hooks/useUser.ts";
import Spinner from "./Spinner.tsx";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: PropsWithChildren) {
  // 1.  Load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  const navigate = useNavigate();
  // 2. If  there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, navigate, isLoading]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
