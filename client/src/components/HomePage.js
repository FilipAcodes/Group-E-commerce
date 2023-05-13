import styled from "styled-components";
import BigItem from "./BigItem";
import SmallItem from "./SmallItem";
import { Oval } from "react-loader-spinner";
import { COLORS } from "../constats";
const HomePage = ({ items }) => {
  return (
    <>
      <Ribbit>Ribbit, ribbit</Ribbit>
      {items !== null ? (
        <Wrapper>
          {items.map((item) => {
            if (item.name.length > 91) {
              return (
                <BigItem
                  product={item}
                  key={item._id}
                  company={item.company[0]}
                />
              );
            } else {
              return <SmallItem product={item} key={item._id} />;
            }
          })}
        </Wrapper>
      ) : (
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
      )}
    </>
  );
};

const Ribbit = styled.p`
  width: 100%;
  font-family: "Just Another Hand";
  text-align: center;
  font-size: 200px;
  opacity: 50%;
  padding-top: 100px;
  z-index: 10;
`;
const Wrapper = styled.div`
  margin-left: 50px;
  margin-right: 50px;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  z-index: 8888;
`;

export default HomePage;
