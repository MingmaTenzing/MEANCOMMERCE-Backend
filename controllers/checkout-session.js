const { StatusCodes } = require("http-status-codes");

const stripe_secret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripe_secret);

const checkoutSession = async (req, res) => {
  const { line_items } = req.body;
  console.log(line_items);
  console.log("working");
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Apple iPhone 15 Pro Max (256 GB) - Blue Titanium",
            images: [
              "https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/61HZS-ZSCLL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/71TSx9D2BVL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/61pXO8SdASL._AC_SX679_.jpg",
            ],
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
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Apple iPhone 15 Pro Max (256 GB) - Blue Titanium",
            images: [
              "https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/61HZS-ZSCLL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/71TSx9D2BVL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/61pXO8SdASL._AC_SX679_.jpg",
            ],
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
      {
        price_data: {
          currency: "aud",
          product_data: {
            name: "Apple iPhone 15 Pro Max (256 GB) - Blue Titanium",
            images: [
              "https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/61HZS-ZSCLL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/71TSx9D2BVL._AC_SX679_.jpg",
              "https://m.media-amazon.com/images/I/61pXO8SdASL._AC_SX679_.jpg",
            ],
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
    ui_mode: "embedded",
    return_url: `http://localhost:4200?session_id={CHECKOUT_SESSION_ID}`,
  });

  res.status(StatusCodes.OK).json(session.client_secret);
};

module.exports = checkoutSession;
