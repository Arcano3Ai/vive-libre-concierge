require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { unifiedSystemInstruction } = require('./agents/orchestrator');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testAgent(prompt) {
    console.log(`\n--- PROMPT: ${prompt} ---`);
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", 
            systemInstruction: unifiedSystemInstruction 
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        console.log(`RESPONSE: ${response.text()}`);
    } catch (error) {
        console.error('ERROR:', error.message);
    }
}

async function runTests() {
    if (!process.env.GEMINI_API_KEY) {
        console.error("ERROR: GEMINI_API_KEY no encontrada en .env");
        return;
    }
    
    await testAgent("Hola, ¿qué villas tienes disponibles para una pareja?");
    await testAgent("¿Qué puedo hacer cerca de Santiago?");
    await testAgent("¿Dónde me recomiendas ir a cenar algo típico?");
    await testAgent("Tengo un problema con el aire acondicionado en mi cabaña.");
    await testAgent("Me interesa reservar Los Cotorritos, ¿cómo le hago?");
}

runTests();
