import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, product, color, totalPiece } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.totalPiece + totalPiece;
            if (newAmount > cartItem.maxStock) {
              newAmount = cartItem.maxStock;
            }
            return { ...cartItem, totalPiece: newAmount };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          totalPiece,
          image: product.images[0].url,
          price: product.price,
          maxStock: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    case REMOVE_CART_ITEM:
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: filteredCart };

    case CLEAR_CART:
      return { ...state, cart: [], totalAmount: 0, totalItems: 0 };

    case TOGGLE_CART_ITEM_AMOUNT:
      const { selectedId, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === selectedId) {
          if (value === "increase") {
            let newAmount = item.totalPiece + 1;
            if (newAmount > item.maxStock) {
              newAmount = item.maxStock;
            }
            return { ...item, totalPiece: newAmount };
          }
          if (value === "decrease") {
            let newAmount = item.totalPiece - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, totalPiece: newAmount };
          }
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };

    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, item) => {
          const { price, totalPiece } = item;
          total.totalItems += totalPiece;
          total.totalAmount += price * totalPiece;
          return total;
        },
        { totalItems: 0, totalAmount: 0 }
      );
      return { ...state, totalItems, totalAmount };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
