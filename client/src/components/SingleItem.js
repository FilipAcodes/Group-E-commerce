import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COLORS } from "../constats";
import { Oval } from "react-loader-spinner";
import { FiShoppingBag } from "react-icons/fi";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

const SingleItem = () => {
  const [product, setProduct] = useState(null);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    fetch(`/item/${itemId}`)
      .then((res) => res.json())
      .then((resData) => {
        setProduct(resData.data);
        if (resData.data !== null) {
          fetch(`/company/${resData.data.companyId}`)
            .then((res) => res.json())
            .then((resData) => {
              setCompany(resData.data);
              setLoading(false);
            });
        }
      });
  }, [itemId]);

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Oval color={COLORS.primaryGreen} height="50" width="50" />
      </div>
    );
  }

  const addProductToCart = () => {
    fetch("/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, itemId: product._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert(data.message);
      });
    setProduct({ ...product, numInStock: product.numInStock - 1 });
  };

  return (
    <Wrapper id="wrapper">
      <Box>
        <ProductImage src={product.imageSrc} />
        <div>
          <Name>{product.name}</Name>
          <Company>{`${company.name}, ${company.country}`}</Company>
          <Price>{product.price}</Price>
          {product.numInStock !== 0 ? (
            <QuantityBox>
              <ButtonCart
                onClick={() => {
                  addProductToCart();
                }}
              >
                <FiShoppingBag /> Add to cart
              </ButtonCart>
            </QuantityBox>
          ) : (
            <NotInStockText>Not in stock</NotInStockText>
          )}
        </div>
      </Box>
    </Wrapper>
  );
};

const NotInStockText = styled.p`
  display: flex;
  position: absolute;
  bottom: 60px;
  right: 180px;
  font-size: 50px;
  color: red;
  font-family: "Jost";
  opacity: 80%;
`;

const QuantityBox = styled.div`
  display: flex;
  position: absolute;
  bottom: 40px;
  right: 120px;
`;

const ButtonCart = styled.button`
  background-color: ${COLORS.primaryGreen};
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 30px;
  width: 400px;
  height: 80px;
  font-size: 25px;
  margin-left: 70px;

  :disabled {
    opacity: 50%;
  }

  &:active {
    scale: 95%;
  }
`;

const Box = styled.div`
  background-color: white;
  height: 700px;
  width: 1200px;
  position: relative;
  top: 50px;
  left: 4%;
  border: 4px solid ${COLORS.primaryGreen};
  border-radius: 50px;
  padding: 60px;
  display: flex;
`;

const Wrapper = styled.div`
  height: 92vh;
  display: flex;
  justify-content: center;
`;
const ProductImage = styled.img`
  width: 600px;
  height: 600px;
  object-fit: contain;
  margin-right: 100px;
`;

const Name = styled.p`
  text-align: center;
  font-size: 50px;
  margin-bottom: 100px;
  font-family: "Jost";
`;

const Price = styled.p`
  font-family: "Jost";
  border-top: 5px solid ${COLORS.primaryGreen};
  border-bottom: 5px solid ${COLORS.primaryGreen};
  font-size: 50px;
  width: 200px;
  text-align: center;
  position: relative;
  left: 30%;
  top: 60px;
`;

const Company = styled.p`
  font-size: 30px;
  text-align: center;
  font-family: "Jost";
  opacity: 70%;
  margin-bottom: 60px;
`;

export default SingleItem;
