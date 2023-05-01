const dotenv = require('dotenv');
const Razorpay = require("razorpay");
const shortid = require("shortid");

// Load environment variables from .env file
dotenv.config()
let id ='rzp_test_RviJRQInjsJGNG'
let key_secret ='cciUy9c1qKnJzD7swycLh6f3'

const razorpay = new Razorpay({
  key_id:id,
  key_secret:key_secret ,
});

const createOrder = async (amount) => {
  const payment_capture = 1;
  const currency = "INR";
  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  const order = await razorpay.orders.create(options);
  return order;
};

module.exports = { createOrder };
