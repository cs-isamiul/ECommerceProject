import React from "react";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [payState, setPayState] = useState({
    paymentFirstName: "",
    paymentLastName: "",
    paymentCardNum: "",
    paymentCardCVC:"",
    paymentCardYear:"",
    paymentCardMonth:"",
  });
  const navigate = useNavigate();


  const onChange = (e) => {
    /*
      used to set state of 

      paymentFirstName
      paymentLastName
      paymentCardNum
      paymentCardCVC
      paymentCardYear
      paymentCardMonth
    */
    const { name, value } = e.target;
    setPayState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const handleSubmit = (e) =>{
    navigate('/cart/shipping',{payState: payState, setPayState: setPayState});
    // history.push('/cart/shipping');
  }

  return (
  <div>
    <form onSubmit={handleSubmit}>
      <h1>Payment Information</h1>

      <input 
        className = 'paymentEntry-font'
        type="text" 
        name = "paymentFirstName"
        placeholder="First Name"
        autoComplete ={false}
        onChange={onChange}
      />
      <input 
        className = 'paymentEntry-font'
        type="text" 
        name = "paymentLastName"
        placeholder="Last Name"
        autoComplete ={false}
        onChange={onChange}
      />
      <input 
        className = 'paymentEntry-font'
        type="text" 
        name = "paymentCardNum"
        placeholder="Credit Card Number"
        autoComplete ={false}
        onChange={onChange}
      />
      <input 
        className = 'paymentEntry-font'
        type="text" 
        name = "paymentCardCVC"
        placeholder="Card  CVC"
        autoComplete ={false}
        onChange={onChange}
      />
      <input 
        className = 'paymentEntry-font'
        type="text" 
        name = "paymentCardYear"
        placeholder="Card Expire Year"
        autoComplete ={false}
        onChange={onChange}
      />
      <input 
        className = 'paymentEntry-font'
        type="text" 
        name = "paymentCardMonth"
        placeholder="Card Expire Month"
        autoComplete ={false}
        onChange={onChange}
      />
      {/* <input type = "button" className = 'bth' value='Pay'/> */}
      <button>Pay</button>
    </form>
  </div>);
 
  //TODO: develop entry for the collection of billing information before placing an order.
}
