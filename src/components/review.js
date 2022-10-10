import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { GenerateInfoHeaderNew, GenereateItemInfo } from "./orderSummaryGenerator";
import "../style.css";

function Review() {
    const [redirct, setRedirct] = useState(false);
    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState([]);
    const [shipping, setShipping] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (redirct) {
            navigate("/catalog");
        }
    }, [redirct]);

    useEffect(() => {
        if (location?.state?.cart && location?.state?.payState && location?.state?.shipState) {
            setCart(location.state.cart);
            setPayment(location.state.payState);
            setShipping(location.state.shipState);
        } else {
            setRedirct(true);
        }
    }, [location])

    const onConfirm = () => {
        navigate("/cart/confirmation", {
            state: {
                cart: cart,
                payState: payment,
                shipState: shipping
            }
        });
    }

    return <>
        <div>
            <h1>Please Review and Confirm that your information is correct</h1>
            <section className="center">
                <GenerateInfoHeaderNew payment={payment} shipping={shipping} />
                <button onClick={() => navigate("/cart/purchase")}>Edit Payment Info</button>&emsp;
                <button onClick={() => navigate("/cart/shipping")}>Edit Shipping Info</button>
            </section>
            <section className="shoplist">
                {cart.map((phone, index) => {
                    console.log(phone);
                    return <GenereateItemInfo key={index} item={phone} />;
                })}
            </section>
            <section className="center">
                <button onClick={() => onConfirm()}>Confirm Order</button>&emsp;
                <button onClick={() => navigate("/catalog")}>Cancel Order</button>
            </section>
        </div>
    </>
}

export default Review;