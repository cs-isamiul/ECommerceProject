import React from "react";
import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Shipping(payState, paySetState) {
  const [shipState, shipSetState] = useState({
    shippingFirstName: "",
    shippingLastName: "",
    shippingPhoneNumber:"",
    shippingAddressOne:"",
    shippingAddressTwo:"",
    shippingCity:"",
    shippingState:"",
    shippingZip:"",
  });

  const location = useLocation();

  const onChange = (e) => {
    /*
      used to set state of 

      shippingFirstName
      shippingLastName
      shippingPhoneNumber
    */
    const { name, value } = e.target;
    shipSetState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  // const navigate = useNavigate();

  // const handleSubmit = (e) =>{
  //   navigate('/cart/shipping', {state: state, setState: setState});
  // }
  console.log(location);
  return (
  <div>
    <form >
      <h1>Shipping Information</h1>

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingFirstName"
        placeholder="First Name"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingLastName"
        placeholder="Last Name"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingPhoneNumber"
        placeholder="Phone Number"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingAddressOne"
        placeholder="Address 1"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingAddressTwo"
        placeholder="Address 2"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingCity"
        placeholder="City"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingState"
        placeholder="State"
        autoComplete ={false}
        onChange={onChange}
      />

      <input 
        className = 'shippingEntey-font'
        type="text" 
        name = "shippingZip"
        placeholder="Zip Code"
        autoComplete ={false}
        onChange={onChange}
      />


      <button>Place Order</button>

    </form>
  </div>);
  
  //TODO: develop entry for the collection of shipping information before placing an order.
}

//alert or consol log
