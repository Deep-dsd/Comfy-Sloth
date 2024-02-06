import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { addingToCart } = useCartContext();
  const { id, stock, colors } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const increaseAmount = () => {
    if (selectedAmount < stock) {
      setSelectedAmount(selectedAmount + 1);
    }
  };

  const decreaseAmount = () => {
    if (selectedAmount > 1) {
      setSelectedAmount(selectedAmount - 1);
    }
  };
  return (
    <Wrapper>
      <section className="colors">
        <span>colors : </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                className={`color-btn ${mainColor === color && "active"}`}
                style={{ background: `${color}` }}
                onClick={() => setMainColor(color)}
              >
                {mainColor === color && <FaCheck />}
              </button>
            );
          })}
        </div>
      </section>
      <section className="btn-container">
        <AmountButtons
          selectedAmount={selectedAmount}
          increaseAmount={increaseAmount}
          decreaseAmount={decreaseAmount}
          stock={stock}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => addingToCart(id, product, selectedAmount, mainColor)}
        >
          add to cart
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
