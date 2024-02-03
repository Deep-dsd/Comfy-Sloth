import React from "react";
import styled from "styled-components";
import { FaPlus, FaMinus } from "react-icons/fa";

const AmountButtons = ({
  selectedAmount,
  increaseAmount,
  decreaseAmount,
  stock,
}) => {
  return (
    <Wrapper className="amount-btns">
      <button
        type="button"
        onClick={decreaseAmount}
        className={`${selectedAmount === 1 && "disabled"} amount-btn`}
      >
        <FaMinus />
      </button>
      <h2>{selectedAmount}</h2>
      <button
        type="button"
        onClick={increaseAmount}
        className={`${selectedAmount === stock && "disabled"} amount-btn`}
      >
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default AmountButtons;
