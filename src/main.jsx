import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/cart_context";
import { FilterProvider } from "./context/filter_context";
import { ProductsProvider } from "./context/products_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductsProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ProductsProvider>
  </React.StrictMode>
);
