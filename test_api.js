require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function run() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Say hi");
    console.log(result.response.text());
  } catch (e) {
    console.error("1.5-flash failed:", e.message);
    try {
      const genAI2 = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model2 = genAI2.getGenerativeModel({ model: "gemini-pro" });
      const result2 = await model2.generateContent("Say hi");
      console.log("Fallback gemini-pro worked:", result2.response.text());
    } catch (e2) {
      console.error("gemini-pro also failed:", e2.message);
    }
  }
}

run();
