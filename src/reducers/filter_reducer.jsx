import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  WINDOW_RESIZE,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxValue = action.payload.products.map((p) => p.price);
      maxValue = Math.max(...maxValue);
      return {
        ...state,
        allProducts: [...action.payload.products],
        filteredProducts: [...action.payload.products],
        filters: { ...state.filters, maxPrice: maxValue, price: maxValue },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        gridView: true,
      };

    case SET_LISTVIEW:
      return {
        ...state,
        gridView: false,
      };
    case WINDOW_RESIZE:
      const { width } = action.payload;
      if (width <= 975 && !state.gridView) {
        state.gridView = true;
      }
      return { ...state, windowWidth: width };

    case UPDATE_SORT:
      return { ...state, sort: action.payload.value };

    case SORT_PRODUCTS:
      const { sort, filteredProducts } = state;
      let tempProducts = [...filteredProducts];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filteredProducts: tempProducts };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
