//import './App.css';
//TODO: add CSS styling
import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Shop from "./components//shop";
import Home from "./components/home";
import Error from "./components/error";
import Cart from "./components/shoppingCart";
import Purchase from "./components/paymentEntry";
import Shipping from "./components/shippingEntry";
import OrderSummary from "./components/viewOrder";
import OrderConfirm from "./components/confirmation";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/catalog" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/purchase" element={<Purchase />} />
          <Route path="/cart/shipping" element={<Shipping />} />
          <Route path="/cart/orderSummary" element={<OrderSummary />} />
          <Route path="/cart/confirmation" element={<OrderConfirm />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
