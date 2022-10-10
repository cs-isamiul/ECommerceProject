//import "./App.css";
//import "./style.css";

//TODO: add CSS styling
import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Shop from "./components/shop";
import Home from "./components/Home";
import Error from "./components/Error";
import Cart from "./components/shoppingCart";
import Purchase from "./components/paymentEntry";
import Shipping from "./components/shippingEntry";
import OrderSummary from "./components/viewOrders";
import OrderConfirm from "./components/confirmation";
import StandardNavbar from "./components/standardNavbar";
import ContactUs from "./components/contactUs";
import Footer from "./components/footer";
import Header from "./components/header";
import Review from "./components/review";

// Bootstrap CSS
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <StandardNavbar cart={cart} setCart={setCart} />
      <Header />
      <Routes>
        <Route
          exact
          path="/"
          element={<Shop cart={cart} setCart={setCart}></Shop>}
        />{" "}
        {/* Was home */}
        <Route
          path="/catalog"
          element={<Shop cart={cart} setCart={setCart} />}
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/cart/purchase" element={<Purchase />} />
        <Route path="/cart/shipping" element={<Shipping />} />
        <Route path="/cart/review" element={<Review />} />{" "}
        <Route path="/cart/orderSummary" element={<OrderConfirm />} />{" "}
        {/* Was orderSummary, but confirm does same thing right now*/}
        <Route path="/cart/confirmation" element={<OrderConfirm />} />
        <Route path="*" element={<Error />} />
        <Route path="/contactUs" element={<ContactUs />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
