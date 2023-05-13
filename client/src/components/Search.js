import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = ({ items }) => {
  const [userInput, setUSerInput] = useState("");
  const searchResult =
    items &&
    items.filter((item) =>
      item.name.toLowerCase().includes(userInput.toLowerCase())
    );

  const navigate = useNavigate();

  return (
    <>
      <input
        type="text"
        placeholder="Insert a product name!"
        onChange={(e) => {
          setUSerInput(e.target.value);
        }}
      />
      {userInput !== "" && (
        <StyledResults>
          {searchResult &&
            searchResult.map((result) => {
              return (
                <p
                  onClick={() => {
                    navigate(`/item/${result._id}`);
                    setUSerInput("");
                  }}
                >
                  {result.name}
                </p>
              );
            })}
        </StyledResults>
      )}
    </>
  );
};

const StyledResults = styled.div`
  height: 200px;
  overflow-y: scroll;
  width: 400px;
  background: white;
  border-radius: 10px;
  z-index: 999999999999;
  p {
    padding: 10px 0px;
    cursor: pointer;
    &:hover {
      background: lightgreen;
    }
  }
`;

export default Search;
