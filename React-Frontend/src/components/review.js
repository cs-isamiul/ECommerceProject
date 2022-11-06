import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  GenerateInfoHeaderNew,
  GenereateItemInfo,
} from "./orderSummaryGenerator";
import "../style.css";

function Review(props) {
  const [redirct, setRedirct] = useState(false);
  const [payment, setPayment] = useState([]);
  const [shipping, setShipping] = useState([]);
  const { cart, setCart } = props;
  var total = 0;
  const location = useLocation();
  const navigate = useNavigate();

  //calculate total, probably remove later
  {
    cart.map((phone, index) => {
      total += Number(phone.price.slice(1)) * phone.count;
    });
  }

  //redirect to catalog if needed
  useEffect(() => {
    if (redirct) {
      navigate("/catalog");
    }
  }, [redirct, navigate]);

  //ensure that customer has a cart, and filled out shipping and payment info
  useEffect(() => {
    if (
      props?.cart &&
      props.cart.length > 0 &&
      location?.state?.payState &&
      location?.state?.shipState
    ) {
      setPayment(location.state.payState);
      setShipping(location.state.shipState);
      setShipping((prevState) => ({
        ...prevState,
        shippingAddressTwo: " ",
      }));
    } else {
      setRedirct(true);
    }
  }, [location, props?.cart]);

  //Confirm Order button
  const onConfirm = async () => {
    //Make api call to /processorder with order info
    var items = cart.map((phone, index) => {
      return { id: phone.id, qty: phone.count };
    });

    const axiosCall = () =>
      axios({
        method: "post",
        url: "http://localhost:5000/processorder",
        data: {
          order: {
            items: items,
            payment: payment,
            shipping: shipping,
          },
        },
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((reply) => {
          return reply;
        })
        .catch((err) => {
          return err;
        });

    //wait for axios call
    const result = await axiosCall();
    //201 means order has been entered into database
    if (result?.status == 201) {
      const cartCopy = cart;
      setCart([]);
      //go to confirmation page
      navigate("/cart/confirmation", {
        state: {
          cart: cartCopy,
          payState: payment,
          shipState: shipping,
          confirmation: result?.data?.confirmation,
          totalTemp: total,
        },
      });
    } else {
      console.log(result.data);
      //for now just print the error into console
      alert("Error: " + result.message);
    }
  };

  return (
    <>
      <div className="center">
        <h1>Please Review and Confirm your information</h1>
        <section>
          <GenerateInfoHeaderNew payment={payment} shipping={shipping} />
          <button
            onClick={() =>
              navigate("/cart/purchase", {
                state: {
                  payment,
                  shipState: location.state.shipState,
                },
              })
            }
          >
            Edit Payment Info
          </button>
          &emsp;
          <button
            onClick={() =>
              navigate("/cart/shipping", {
                state: {
                  shipping,
                  payState: location.state.payState,
                },
              })
            }
          >
            Edit Shipping Info
          </button>
        </section>
      </div>
      <section className="shoplist" style={{ marginLeft: "5rem" }}>
        {cart.map((phone, index) => {
          return <GenereateItemInfo key={index} item={phone} />;
        })}
      </section>
      <div className="center">
        <hr />
        <section>
          <h2>Subtotal: ${total}</h2>
          <h2>Shipping & Handling: Lab 9 Shipping</h2>
          <h2>Total Before Taxes: ${total}</h2>
          <h2>Estimated Taxes: Lab 9 Shipping</h2>
          <h2>Total: ${total}</h2>
        </section>
        <section>
          <button onClick={() => onConfirm()}>Confirm Order</button>&emsp;
          <button onClick={() => navigate("/catalog")}>Cancel Order</button>
        </section>
      </div>
    </>
  );
}

export default Review;
