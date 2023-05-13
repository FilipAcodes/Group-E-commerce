import styled from "styled-components";
import { FiShoppingBag } from "react-icons/fi";
import { COLORS } from "../constats";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";

const BigItem = ({ product, company }) => {
  return (
    <Wrapper>
      <Image src={product.imageSrc} />
      <Info>
        <Name>{product.name}</Name>
        <Company>{`${company.name}, ${company.country}`}</Company>
        <Price>{product.price}</Price>
        <NavLink to={`item/${product._id}`}>
          <IconContext.Provider
            value={{ color: COLORS.primaryGreen, size: "50px" }}
          >
            <BagIcon />
          </IconContext.Provider>
        </NavLink>
      </Info>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  width: 600px;
  height: 280px;
  border: 4px solid ${COLORS.primaryGreen};
  border-radius: 30px;
  margin-top: 50px;
  display: flex;
`;

const Info = styled.div`
  position: relative;
  top: 50px;
`;

const Company = styled.p`
  text-align: left;
  font-family: "Jost";
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
`;

const BagIcon = styled(FiShoppingBag)`
  position: relative;
  left: 210px;
  bottom: 30px;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 15px;
  position: relative;
  left: 50px;
  top: 50px;
  margin-right: 100px;
`;

const Name = styled.p`
  text-align: left;
  font-size: 20px;
  font-family: "Jost";
  width: 280px;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 50px;
`;

const Price = styled.p`
  margin-top: 10px;
  text-align: left;
  font-family: "Jost";
  font-weight: bold;
  font-size: 30px;
`;

export default BigItem;
