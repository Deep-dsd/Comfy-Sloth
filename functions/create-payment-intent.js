// require("dotenv").config();

// const stripe = require("stripe")(
//   import.meta.env.VITE_REACT_APP_STRIPE_SECRET_KEY
// );
// exports.handler = async function (event, context) {
//   if (event.body) {
//     const { cart, shippingFee, totalAmount } = JSON.parse(event.body);

//     const calculateOrderAmount = () => {
//       return shippingFee + totalAmount;
//     };
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: calculateOrderAmount(),
//         currency: "usd",
//       });
//       return {
//         statusCode: 200,
//         body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//       };
//     } catch (error) {
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ msg: error.message }),
//       };
//     }
//   }
//   return {
//     statusCode: 200,
//     body: "Create Payment Intent",
//   };
// };
