const axios = require("axios");

const analyzeApiResponse = async ({ method, url, requestBody, response }) => {
  const prompt = `You are an API testing assistant like Postman AI. Analyze this API call briefly:

Request: ${method} ${url}
Body: ${JSON.stringify(requestBody || {})}
Response Status: ${response.status} ${response.statusText}
Response Data: ${JSON.stringify(response.data).slice(0, 500)}

Give a short 3-part analysis:
1. What happened (1-2 lines)
2. If error: what caused it and how to fix it
3. Key data returned (if success)

Be concise, plain text only.`;

  const res = await axios.post(
    "https://api.cohere.ai/v1/chat",
    {
      model: "command-r7b-12-2024",
      message: prompt,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.text.trim();
};

module.exports = { analyzeApiResponse };
