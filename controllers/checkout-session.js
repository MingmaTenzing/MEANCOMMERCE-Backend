const { StatusCodes } = require("http-status-codes");

const stripe_secret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripe_secret);

const checkoutSession = async (req, res) => {
  console.log("working");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          maximum: 100,
          minimum: 0,
        },
      },
    ],
    mode: "payment",
    ui_mode: "hosted",
    success_url: `http://localhost:4200/success.html`,
    cancel_url: `http://localhost:4200/cancel.html`,
  });

  res.status(StatusCodes.OK).json(session.url);
};

module.exports = checkoutSession;
