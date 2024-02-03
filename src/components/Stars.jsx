import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
  return (
    <Wrapper>
      <div className="stars">
        {[...Array(5)].map((_, i) => {
          const starNum = i + 0.5;
          if (stars >= i + 1) {
            return (
              <span key={i}>
                <BsStarFill />
              </span>
            );
          } else if (stars >= starNum) {
            return (
              <span key={i}>
                <BsStarHalf />
              </span>
            );
          } else {
            return (
              <span key={i}>
                <BsStar />
              </span>
            );
          }
        })}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
