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

    case UPDATE_FILTERS:
      const { name, value } = action.payload;

      return { ...state, filters: { ...state.filters, [name]: value } };

    case FILTER_PRODUCTS:
      const { allProducts } = state;
      const { text, company, category, altCategory, color, price, shipping } =
        state.filters;
      let temp_category = category;
      console.log(altCategory);
      let temp_products = [...allProducts];
      //filtering
      // text
      if (text) {
        temp_products = temp_products.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }

      // if (altCategory === "all") {
      //   state.filters.category = state.filters.altCategory;
      // }
      // if (category === "all") {
      //   state.filters.altCategory = state.filters.category;
      // }
      //category
      if (category !== "all") {
        // state.filters.altCategory = state.filters.category;
        temp_products = temp_products.filter((product) => {
          return product.category.toLowerCase() === category;
        });
      }
      //altCategory
      if (altCategory !== "all") {
        // state.filters.category = state.filters.altCategory;
        temp_products = temp_products.filter((product) => {
          return product.category.toLowerCase() === altCategory;
        });
      }
      //company
      if (company !== "all") {
        temp_products = temp_products.filter((product) => {
          return product.company.toLowerCase() === company;
        });
      }
      //colors
      if (color !== "all") {
        temp_products = temp_products.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }

      //shipping
      if (shipping) {
        temp_products = temp_products.filter((product) => {
          return product.shipping;
        });
      }
      //price
      temp_products = temp_products.filter((product) => product.price <= price);

      return { ...state, filteredProducts: temp_products };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          altCategory: "all",
          color: "all",
          price: state.filters.maxPrice,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
