import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Products,
  SingleProduct,
} from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<SingleProduct />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<Error />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
