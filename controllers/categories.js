// const supabase = require("../db/supabase");
// const image = require("../ming.jpg");
const getAllCategories = async (req, res) => {
  // try {
  //   const { data, error } = await supabase
  //     .from("test")
  //     .insert({
  //       name: "mingma Tenzing Sherpa loves you",
  //     })
  //     .select("*");
  //   res.json({ data });
  // } catch (err) {}

  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("Product Images")
  //       .upload("/public/product", image, {
  //         cacheControl: "3600",
  //         upsert: false,
  //       });
  //   } catch (error) {}
  // };

  res.json({
    categories: [
      "smartphone",
      "computers",
      "gamingconsoles",
      "accessories",
      "headphones",
    ],
  });
};

module.exports = getAllCategories;
