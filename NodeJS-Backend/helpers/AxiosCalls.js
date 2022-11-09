const axios = require("axios");

//Make a call to inventory/single api
async function AxiosGETSingle(id) {
  let response = await axios({
    method: "get",
    url: "http://localhost:5000/inventory/single",
    data: {
      id: id,
    },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((reply) => {
      return { invQty: reply.data[0].invQty };
    })
    .catch((err) => {
      return { err: err.response };
    });
  return response;
}

async function AxiosPUTUpdateCount(id, qty) {
  let response = await axios({
    method: "put",
    url: "http://localhost:5000/inventory",
    data: {
      id: id,
      qty: qty,
    },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((reply) => {
      return reply.status;
    })
    .catch((err) => {
      return err.response.status;
    });
  return response;
}

async function AxiosPOSTCredit(cardInfo) {
  const { name, account, customer } = cardInfo;
  let response = await axios({
    method: "post",
    url: "http://localhost:5555/bank/process",
    data: {
      name: name,
      account: account,
      customer: customer,
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
      return err.response;
    });
  return response;
}

async function AxiosPOSTShipping(shippingInfo, itemInfo) {
  let response = await axios({
    method: "post",
    url: "http://localhost:5554/shipping/process",
    data: {
      fname: shippingInfo.shippingFirstName,
      lname: shippingInfo.shippingLastName,
      street: shippingInfo.shippingAddressOne,
      city: shippingInfo.shippingCity,
      state: shippingInfo.shippingState,
      zip: shippingInfo.shippingZip,
      items: itemInfo.count,
      "weight-oz": itemInfo.weight,
      "box-size-in": itemInfo.size,
      "business-name": "E-Shop",
      account: "157079632679",
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
      return err.response;
    });
  return response;
}
module.exports = {
  AxiosGETSingle,
  AxiosPUTUpdateCount,
  AxiosPOSTCredit,
  AxiosPOSTShipping,
};
