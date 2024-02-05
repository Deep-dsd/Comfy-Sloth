import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
const Filters = () => {
  const { state, updateFilters, clearFilters } = useFilterContext();
  const {
    filters: {
      text,
      category,
      altCategory,
      company,
      color,
      minPrice,
      price,
      maxPrice,
      shipping,
    },
    allProducts,
    windowWidth,
  } = state;

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper className={`${windowWidth <= 768 && "sticky"}`}>
      {/* <div className="expander">
        <MdKeyboardDoubleArrowDown />
      </div> */}
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search Input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="Search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* end search input */}
          {/* categories */}
          <div className="small-screen">
            {windowWidth <= 768 ? (
              <div className="form-control">
                <h5>Category</h5>
                <select
                  name="altCategory"
                  value={altCategory}
                  className="category"
                  onChange={updateFilters}
                >
                  {categories.map((category) => {
                    return (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="form-control">
                <h5>Category</h5>
                <div>
                  {categories.map((c) => {
                    return (
                      <button
                        key={c}
                        className={`${
                          c.toLowerCase() === category && "active"
                        }`}
                        onClick={updateFilters}
                        name="category"
                        type="button"
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* end of categories */}
            {/* company */}
            <div className="form-control">
              <h5>Company</h5>
              <select
                name="company"
                value={company}
                className="company"
                onChange={updateFilters}
              >
                {companies.map((company) => {
                  return (
                    <option value={company} key={company}>
                      {company}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* end of company */}
            {/* colors */}
            <div className="form-control">
              <h5>Colors</h5>
              <div className="colors">
                {colors.map((c) => {
                  if (c === "all") {
                    return (
                      <button
                        key={c}
                        className={`${
                          color === "all" ? "all-btn active" : "all-btn"
                        } `}
                        type="button"
                        name="color"
                        onClick={updateFilters}
                        data-color="all"
                      >
                        All
                      </button>
                    );
                  }
                  return (
                    <button
                      key={c}
                      className={`${c === color && "active"} color-btn`}
                      type="button"
                      name="color"
                      data-color={c}
                      onClick={updateFilters}
                      style={{ background: c }}
                    >
                      {color === c && <FaCheck />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          {/* end of colors */}
          {/* price */}
          <div className="small-screen">
            <div className="form-control">
              <h5>Price</h5>
              <p className="price">{formatPrice(price)}</p>
              <input
                type="range"
                name="price"
                onChange={updateFilters}
                min={minPrice}
                max={maxPrice}
                value={price}
              />
            </div>
            {/* end of price */}
            {/* shipping */}
            <div className="form-control shipping">
              <label htmlFor="shipping">Free Shipping</label>
              <input
                type="checkbox"
                name="shipping"
                id="shipping"
                checked={shipping}
                onChange={updateFilters}
              />
            </div>
          </div>
          {/* end of shipping */}
          {/* clear filters */}
          <button className="clear-btn" onClick={clearFilters} type="button">
            Clear Filters
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company,
  .category {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
    .expander {
      display: none;
    }
  }
  @media (max-width: 768px) {
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .small-screen {
      display: flex;
      gap: 1rem;
    }

    .form-control {
      width: 100%;
      text-align: center;
    }
    .search-input {
      width: 80%;
    }
    .expander {
      position: absolute;
      bottom: -10px;
      left: 50%;
      z-index: 7000;
      /* font-size: 2rem; */
      overflow: visible;
      height: 30px;
      width: 30px;
      background-color: var(--clr-primary-9);
      color: var(--clr-grey-1);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 0 5px -2px var(--clr-black);
      svg {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Filters;
