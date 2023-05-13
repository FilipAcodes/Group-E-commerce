import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { COLORS } from "../constats";

const LogOutButton = () => {
  const { logout } = useAuth0();
  return (
    <StyledButton onClick={() => logout()}>
      <StyledLogOutIcon />
    </StyledButton>
  );
};

export default LogOutButton;

const StyledButton = styled.button`
  background-color: ${COLORS.backgroundGreen};
  color: ${COLORS.primaryGreen};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const StyledLogOutIcon = styled(FiLogOut)`
  font-size: 39px; ;
`;
