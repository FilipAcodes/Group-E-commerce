import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { COLORS } from "../constats";
import { FiTrash, FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { UserContext } from "./UserContext";
import { Oval } from "react-loader-spinner";

const Cart = () => {
  const [products, setProducts] = useState();
  const [userCart, setUserCart] = useState([]);
  const [reload, setReload] = useState(false);
  const shippingPrice = 0;
  const { user } = useContext(UserContext);

  //Can console.log to see the user options, will most likely use user.email
  useEffect(() => {
    fetch("/api-getitems")
      .then((res) => res.json())
      .then((data) => setProducts(data.data));
  }, []);

  useEffect(() => {
    if (user) {
      fetch("/createuser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })
        .then((res) => res.json())
        .then((data) => {});
      fetch(`/cart/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserCart(data.data.cartProducts);
        });
    }
  }, [user, reload]);

  const removeItem = (id) => {
    fetch("/removeproduct", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, itemId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Product removed");
        setReload(!reload);
      });
  };

  const deleteItem = (id) => {
    fetch("/deleteproduct", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, itemId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Product deleted");
        setReload(!reload);
      });
  };
  const completePurchase = () => {
    fetch("/completepurchase", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setReload(!reload);
        window.alert("Items successfully purchased!");
      });
  };
  const addItem = (id) => {
    fetch("/addproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, itemId: id }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.alert("Product added");
        setReload(!reload);
      });
  };

  if (!products || !user || !userCart) {
    if (!user) {
      return (
        <Wrapper>
          <CartContainer>
            <Notice>Please log in to see cart</Notice>
          </CartContainer>
        </Wrapper>
      );
    }
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
  let sum = 0;

  return (
    <Wrapper>
      <CartContainer>
        {userCart.length === 0 ? (
          <Notice>Cart is empty</Notice>
        ) : (
          <>
            <ItemsContainer id="itemContainer">
              {userCart.map((cartProduct) => {
                return products.map((product, index) => {
                  if (cartProduct.itemId === product._id) {
                    sum += cartProduct.totalPrice;
                    return (
                      <ContainerForItems id="container for items" key={index}>
                        <ImageOfProducts
                          src={product.imageSrc}
                          alt="userItem"
                        ></ImageOfProducts>
                        <IndividualItemDescContainer>
                          <StyledInformationParagraproducts>
                            {product.name}
                          </StyledInformationParagraproducts>
                          <StyledInformationParagraproducts>
                            Price: {product.price}
                          </StyledInformationParagraproducts>
                          <StyledInformationParagraproducts>
                            Quantity: {cartProduct.quantity}
                            <PlusMinusButtons
                              onClick={() => {
                                removeItem(cartProduct.itemId);
                              }}
                            >
                              <FiMinusSquare />
                            </PlusMinusButtons>
                            <PlusMinusButtons
                              onClick={() => {
                                addItem(cartProduct.itemId);
                              }}
                            >
                              <FiPlusSquare />
                            </PlusMinusButtons>
                          </StyledInformationParagraproducts>
                          <StyledInformationParagraproducts>
                            <BoldSpan>
                              TOTAL: ${cartProduct.totalPrice}
                            </BoldSpan>
                          </StyledInformationParagraproducts>
                        </IndividualItemDescContainer>
                        <StyledTrashButton
                          onClick={() => {
                            deleteItem(cartProduct.itemId);
                          }}
                        >
                          <FiTrash />
                        </StyledTrashButton>
                      </ContainerForItems>
                    );
                  }
                });
              })}
            </ItemsContainer>
            <PriceBlock>
              <PriceBlockSingle>
                <PriceBlockText>Items: </PriceBlockText>
                <PriceBlockText>${Math.round(sum * 100) / 100}</PriceBlockText>
              </PriceBlockSingle>
              <PriceBlockSingle>
                <PriceBlockText>Shipping & Handling: </PriceBlockText>
                <PriceBlockText>${shippingPrice}</PriceBlockText>
              </PriceBlockSingle>
              <PriceBlockSingle>
                <PriceBlockText>Total before tax: </PriceBlockText>
                <PriceBlockText>
                  ${Math.round(sum * 100) / 100 + shippingPrice}
                </PriceBlockText>
              </PriceBlockSingle>
              <PriceBlockSingle>
                <PriceBlockText>Estimated GST/HST </PriceBlockText>
                <PriceBlockText>
                  $
                  {Math.round(
                    (Math.round(sum * 100) / 100 + shippingPrice) * 0.05 * 100
                  ) / 100}
                </PriceBlockText>
              </PriceBlockSingle>
              <PriceBlockSingle>
                <PriceBlockText>Estimated PST/RST/QST: </PriceBlockText>
                <PriceBlockText>
                  $
                  {Math.round(
                    (Math.round(sum * 100) / 100 + shippingPrice) *
                      0.09975 *
                      100
                  ) / 100}
                </PriceBlockText>
              </PriceBlockSingle>
              <OrderTotal>
                <PriceBlockText>Order total: </PriceBlockText>
                <PriceBlockText>
                  $
                  {Math.round(
                    (Math.round(sum * 100) / 100 +
                      shippingPrice +
                      Math.round(
                        (Math.round(sum * 100) / 100 + shippingPrice) *
                          0.05 *
                          100
                      ) /
                        100 +
                      Math.round(
                        (Math.round(sum * 100) / 100 + shippingPrice) *
                          0.09975 *
                          100
                      ) /
                        100) *
                      100
                  ) / 100}
                </PriceBlockText>
              </OrderTotal>
            </PriceBlock>
            <PurchaseButton onClick={() => completePurchase()}>
              Place your order
            </PurchaseButton>
          </>
        )}
      </CartContainer>
    </Wrapper>
  );
};

export default Cart;

const PurchaseButton = styled.button`
  width: 300px;
  font-size: 30px;
  position: absolute;
  bottom: 30px;
  right: 40px;
  height: 60px;
  text-align: center;
  color: white;
  border-radius: 15px;
  background-color: ${COLORS.primaryGreen};
  border: none;
  cursor: pointer;

  :hover {
    opacity: 60%;
  }
`;

const PriceBlockSingle = styled.div`
  display: flex;
  justify-content: space-between;
`;
const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-top: 30px;
`;

const PriceBlock = styled.div`
  width: 300px;
  position: relative;
  left: 870px;
  top: 50px;
  font-size: 20px;
`;
const PriceBlockText = styled.p``;

const Notice = styled.p`
  font-size: 50px;
  text-align: center;
  width: 100%;
  position: relative;
  top: 300px;
`;

const PlusMinusButtons = styled.button`
  color: ${COLORS.primaryGreen};
  background-color: white;
  border: none;
  cursor: pointer;

  :hover {
    opacity: 70%;
  }
`;

const Wrapper = styled.div`
  height: 92vh;
  display: flex;
  justify-content: center;
  font-family: "Jost";
`;

const ItemsContainer = styled.div`
  margin-top: 5px;
  padding-top: 15px;
  width: 98%;
  height: 50%;
  margin-top: 1%;
  margin-left: 1%;
  margin-right: 1%;
  overflow-y: auto;
  border-bottom: 1px solid ${COLORS.primaryGreen};
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 700px;
  width: 1200px;
  position: relative;
  top: 50px;
  left: 2%;
  border: 4px solid ${COLORS.primaryGreen};
  border-radius: 50px;
  padding: 15px;
  display: flex;
`;

const IndividualItemDescContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageOfProducts = styled.img`
  border-radius: 8px;
  border: 1px dotted black;
  margin-left: 1%;
  margin-bottom: 1%;
  float: left;
`;

const StyledInformationParagraproducts = styled.p`
  margin-top: 1%;
  margin-left: 2%;
`;

const BoldSpan = styled.span`
  font-weight: bold;
`;

const StyledTrashButton = styled.button`
  color: red;
  background-color: white;
  border: none;
  font-size: 30px;
  position: relative;
  left: 880px;
  bottom: 40px;
  &:hover {
    opacity: 30%;
    cursor: pointer;
  }
`;

const ContainerForItems = styled.div`
  height: 200px;
  margin-bottom: 20px;
  border-bottom: 2px solid ${COLORS.primaryGreen};
`;
