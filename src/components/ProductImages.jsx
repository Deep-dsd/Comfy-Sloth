import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
const ProductImages = ({ images = [{ url: "" }] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const nextSlide = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage((prevImg) => (prevImg = 0));
    } else {
      setCurrentImage((prevImg) => (prevImg = prevImg + 1));
    }
  };
  const previousSlide = () => {
    if (currentImage === 0) {
      setCurrentImage((prevImg) => (prevImg = images.length - 1));
    } else {
      setCurrentImage((prevImg) => (prevImg = prevImg - 1));
    }
  };
  return (
    <Wrapper>
      <div className="img-slider">
        {images.map((img, i) => {
          return (
            <img
              src={img.url}
              alt="main img"
              key={i}
              className="main"
              style={{ translate: `${-100 * currentImage}%` }}
            />
          );
        })}
        <FaArrowCircleLeft
          className="arrow arrow-left"
          onClick={previousSlide}
        />
        <FaArrowCircleRight className="arrow arrow-right" onClick={nextSlide} />
      </div>
      <div className="gallery">
        {images.map((img, i) => {
          return (
            <img
              src={img.url}
              alt={img.filename}
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`${currentImage === i ? "active" : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .img-slider {
    width: 100%;
    display: flex;
    overflow: hidden;
    border-radius: var(--radius);
    position: relative;
    align-items: center;
  }
  .main {
    height: 600px;
    flex-grow: 0;
    flex-shrink: 0;
    transition: translate ease-in-out 300ms;
  }

  .arrow {
    position: absolute;
    font-size: 3.5rem;
    color: var(--clr-primary-8);
    filter: drop-shadow(0 0 5px var(--clr-primary-1));
    cursor: pointer;
    user-select: none;
    transition: color ease-in 150ms;
    opacity: 0.6;
  }

  .arrow:hover,
  .arrow:focus-visible {
    color: var(--clr-primary-5);
  }

  .arrow-left {
    left: 1rem;
  }

  .arrow-right {
    right: 1rem;
  }

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .image-slider,
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
