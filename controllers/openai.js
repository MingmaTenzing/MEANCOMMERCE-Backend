const { OpenAI } = require("openai");
const baseURL = "https://api.aimlapi.com/v1";
const open_ai = new OpenAI({ apiKey: process.env.AI_ML_API_SECRET, baseURL });

const openai_suggestion = async (req, res) => {
  const response = await open_ai.chat.completions.create({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    messages: [
      {
        role: "system",
        content:
          "You are an electronic e-commerce shop. You sell smartphones, earphones, laptops, tv and camera. Help the user choosing  the right product when comparing",
      },
      {
        role: "user",
        content: "Which is better iphone 14 pro or pixel 8",
      },
    ],
  });
  res.json(response.choices[0].message.content);
};

module.exports = {
  openai_suggestion,
};
