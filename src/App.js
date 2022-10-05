//import "./App.css";
//import "./style.css";

//TODO: add CSS styling
import React from "react";

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

// Bootstrap CSS
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
      <Router>
        {/* <StandardNavbar /> */}
            <Routes>
              <Route exact path="/" element={<Shop />} /> {/* Was home */}
              <Route path="/catalog" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/purchase" element={<Purchase />} />
              <Route path="/cart/shipping" element={<Shipping />} />
              <Route path="/cart/orderSummary" element={<OrderConfirm />} /> {/* Was orderSummary, but confirm does same thing right now*/}
              <Route path="/cart/confirmation" element={<OrderConfirm />} />
              <Route path="*" element={<Error />} />
            </Routes>
      </Router>
  );
}

export default App;
