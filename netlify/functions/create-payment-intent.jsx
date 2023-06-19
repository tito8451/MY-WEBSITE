require("dotenv").config();
const stripe = require("stripe")(`${import.meta.env.VITE_STRIPE_SECRET_KEY}`);

exports.handler = async (event) => {
  console.log(event.body);
  try {
    const { amount } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "eur",
      payment_method_types: ["card"],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log("je cherche l'erreur");
    console.log({ error });
    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
