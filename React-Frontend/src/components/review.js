import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { GenerateInfoHeaderNew, GenereateItemInfo } from "./orderSummaryGenerator";
import "../style.css";

function Review() {
    const [redirct, setRedirct] = useState(false);
    const [cart, setCart] = useState([]);
    const [payment, setPayment] = useState([]);
    const [shipping, setShipping] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    //redirect to catalog if needed
    useEffect(() => {
        if (redirct) {
            navigate("/catalog");
        }
    }, [redirct, navigate]);

    //ensure that customer has a cart, and filled out shipping and payment info
    useEffect(() => {
        if (location?.state?.cart && location?.state?.payState && location?.state?.shipState) {
            setCart(location.state.cart);
            setPayment(location.state.payState);
            setShipping(location.state.shipState);
        } else {
            setRedirct(true);
        }
    }, [location])

    //Confirm Order button
    const onConfirm = async () => {
        //Make api call to /processorder with order info
        const axiosCall = ()=> axios({
            method: "post",
            url: "http://localhost:5000/processorder",
            data: {
                order: {
                    items: cart,
                    payment: payment,
                    shipping: shipping
                }
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
        if(result.status == 201){
            //go to confirmation page
            navigate("/cart/confirmation", {
                state: {
                    cart: cart,
                    payState: payment,
                    shipState: shipping,
                    confirmation: result.data.message
                }
            });
        } else {
            //for now just print the error into console
            console.log(result.data.message);
        }
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