const { OpenAI } = require("openai");
const baseURL = "https://api.aimlapi.com/v1";
const open_ai = new OpenAI({ apiKey: process.env.AI_ML_API_SECRET, baseURL });

const openai_suggestion = async (req, res) => {
  const { query } = req.body;
  console.log(query);

  try {
    const response = await open_ai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an electronic e-commerce shop. You sell smartphones, earphones, laptops, tv and camera. Help the user choosing  the right product when comparing",
        },
        {
          role: "user",
          content: query,
        },
      ],
    });
    console.log(response.choices);

    res.json({
      message: response.choices[0].message.content,
      role: "system",
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

module.exports = {
  openai_suggestion,
};
