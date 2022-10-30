import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GenerateInfoHeaderNew, GenereateItemInfo } from "./orderSummaryGenerator";
import Card from "react-bootstrap/Card";
// import StandardNavbar from "./standardNavbar";
import "../style.css";

function OrderConfirm() {
  const [redirct, setRedirct] = useState(false);
  const [payment, setPayment] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [confirmation, setConfirmation] = useState([]);
  const [cart, setCart] = useState([]);
  //total is temp 'solution'
  const [total, setTotal] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  //redirect to catalog if needed
  useEffect(() => {
    if (redirct) {
      navigate("/catalog");
    }
  }, [redirct, navigate]);

  useEffect(() => {
    if (location?.state.confirmation && location?.state.payState && location?.state?.shipState && location?.state?.cart) {
      setPayment(location.state.payState);
      setShipping(location.state.shipState);
      setConfirmation(location.state.confirmation);
      setCart(location.state.cart);
      setTotal(location.state.totalTemp);
      //get all info from database confirmation later
      setPayment((prevState) => ({
        ...prevState,
        paymentCardNum: "****" + prevState.paymentCardNum.slice(-4)
      }));

    } else {
      //setRedirct(true);
    }
  }, [location]);

  return <>
    <div className="center">
      <h1>Congratulations! Your order has been confirmed!</h1>
      <section>
        <h1>Confirmation #{confirmation}</h1>
      </section>

      <section>
        <GenerateInfoHeaderNew payment={payment} shipping={shipping} />
      </section>
      <section>
        <h3>Expected Delivery Date: Lab 9 Microservice Call</h3>
      </section>

      <section className="shoplist">
        {cart.map((phone, index) => {
          console.log(phone);
          return <GenereateItemInfo key={index} item={phone} />;
        })}
      </section>
      <hr/>
      <section>
        <h2>Payment Summary #{confirmation}</h2>
        <h2>Subtotal: ${total}</h2>
        <h2>Shipping & Handling: Lab 9 Shipping</h2>
        <h2>Total Before Taxes: ${total}</h2>
        <h2>Estimated Taxes: Lab 9 Shipping</h2>
        <h2>Total: ${total}</h2>
      </section>
    </div>
  </>
}

export default OrderConfirm;
