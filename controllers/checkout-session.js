const { StatusCodes } = require("http-status-codes");

const stripe_secret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripe_secret);

const checkoutSession = async (req, res) => {
  const { line_items } = req.body;

  console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    ui_mode: "embedded",
    return_url: `http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.status(StatusCodes.OK).json(session.client_secret);
};

module.exports = checkoutSession;
