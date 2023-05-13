import React from "react";
import { FiLogIn } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { COLORS } from "../constats";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <StyledButton onClick={() => loginWithRedirect()}>
      <StyledLogInIcon />
    </StyledButton>
  );
};

export default LoginButton;

const StyledButton = styled.button`
  background-color: ${COLORS.backgroundGreen};
  color: ${COLORS.primaryGreen};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLogInIcon = styled(FiLogIn)`
  font-size: 39px; ;
`;
