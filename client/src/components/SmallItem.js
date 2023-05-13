import styled from "styled-components";
import { FiShoppingBag } from "react-icons/fi";
import { COLORS } from "../constats";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";

const SmallItem = ({ product }) => {
  return (
    <Wrapper>
      <Image src={product.imageSrc} />
      <Name>{product.name}</Name>
      <Price>{product.price}</Price>
      <NavLink to={`item/${product._id}`}>
        <IconContext.Provider
          value={{ color: COLORS.primaryGreen, size: "30px" }}
        >
          <BagIcon />
        </IconContext.Provider>
      </NavLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  width: 250px;
  height: 280px;
  border: 4px solid ${COLORS.primaryGreen};
  border-radius: 30px;
  margin-top: 50px;
  margin-right: 10px;
  margin-left: 10px;
`;

const BagIcon = styled(FiShoppingBag)`
  position: relative;
  left: 210px;
  bottom: 30px;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: contain;
  position: relative;
  left: 50px;
  margin-top: 10px;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const Name = styled.p`
  text-align: center;
  font-family: "Jost";
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
`;

const Price = styled.p`
  margin-top: 10px;
  text-align: center;
  font-family: "Jost";
  font-weight: bold;
`;

export default SmallItem;
