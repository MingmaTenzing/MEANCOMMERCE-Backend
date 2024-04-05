const supabase = require("../db/supabase");

const getAllCategories = async (req, res) => {
  try {
    const { data } = await supabase.from("test").select("*");
    if (data) {
      res.json({ data });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = getAllCategories;
