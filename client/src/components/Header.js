import styled from "styled-components";
import { COLORS } from "../constats";
import { FiShoppingCart } from "react-icons/fi";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import FrogLogo from "../assets/FrogLogo.svg";
import LoginButton from "./LoginButton";
import LogOutButton from "./LogOutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import Search from "./Search";
const Header = ({ items }) => {
  const { isAuthenticated } = useAuth0();
  const { userId } = useContext(UserContext);
  return (
    <>
      <HeaderDiv>
        <HomeLink to="/">
          <Logo src={FrogLogo} /> <LogoText>FrogoShop</LogoText>
        </HomeLink>
        <StyledSearch>
          <Search items={items} />
        </StyledSearch>
        <LogInOutContainer>
          {isAuthenticated ? <LogOutButton /> : <LoginButton />}
        </LogInOutContainer>
        <CartLink to={`/cart/${userId}`}>
          {isAuthenticated && (
            <IconContext.Provider
              value={{ color: COLORS.primaryGreen, size: "40px" }}
            >
              <FiShoppingCart />
            </IconContext.Provider>
          )}
        </CartLink>
      </HeaderDiv>
    </>
  );
};

const Logo = styled.img`
  height: 80px;
  position: relative;
  bottom: 10px;
`;
const LogoText = styled.p`
  font-family: "Jost";
  font-size: 35px;
  position: relative;
  top: 10px;
`;

const HeaderDiv = styled.header`
  z-index: 5555;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${COLORS.backgroundGreen};
  height: 60px;
`;
const StyledSearch = styled.header`
  position: absolute;
  top: 30%;
  left: 65%;
`;

const CartLink = styled(NavLink)`
  position: absolute;
  right: 40px;
  top: 10px;
`;

const HomeLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  color: ${COLORS.primaryGreen};
  position: absolute;
  left: 44%;
`;

const LogInOutContainer = styled.div`
  padding: 5px;
`;
export default Header;
