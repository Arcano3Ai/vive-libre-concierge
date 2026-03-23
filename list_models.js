require('dotenv').config();

async function listModelsRaw() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Raw V1 Models:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Raw V1 fetch failed:", e.message);
  }
}

listModelsRaw();
