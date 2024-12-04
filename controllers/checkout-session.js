const { StatusCodes } = require("http-status-codes");

const stripe_secret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripe_secret);
const Order = require("../models/order");

const checkoutSession = async (req, res) => {
  const { line_items } = req.body;

  if (!line_items) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide line items" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      ui_mode: "embedded",
      return_url: `http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    res.status(StatusCodes.OK).json(session.client_secret);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

const sessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );

    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );

    const charge = await stripe.charges.retrieve(paymentIntent.latest_charge);

    const saveOrder = await Order.create({
      user_id: req.user.userId,
      paymend_intent: session.payment_intent,
      charge_id: paymentIntent.latest_charge,
      total_amount: session.amount_total,
      customer_email: session.customer_details.email,
      customer_name: session.customer_details.name,
      status: session.status,
      receipt_url: charge.receipt_url,
    });



    res.status(StatusCodes.OK).json({
      status: session.status,

      customer_email: session.customer_details.email,
      customer_name: session.customer_details.name,
      id: session.id,
      payment_intent: session.payment_intent,
      amount_subtotal: session.amount_subtotal,
      amount_total: session.amount_total,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error });
  }
};

module.exports = { checkoutSession, sessionStatus };
