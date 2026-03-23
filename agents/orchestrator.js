const butler = require('./butler');
const villaExpert = require('./villa_expert');
const localGuide = require('./local_guide');
const foodie = require('./foodie');
const maintenance = require('./maintenance');
const booking = require('./booking');

const unifiedSystemInstruction = `
${butler.systemInstruction}

CONOCIMIENTO DE NUESTRAS VILLAS:
${JSON.stringify(villaExpert.villaData, null, 2)}

SUGERENCIAS DE ACTIVIDADES LOCALES (SANTIAGO, N.L.):
${JSON.stringify(localGuide.localActivities, null, 2)}

EXPERIENCIAS GASTRONÓMICAS (RECOMENDACIONES):
${JSON.stringify(foodie.diningOptions, null, 2)}
${foodie.systemInstruction}

SOPORTE Y MANTENIMIENTO AL HUÉSPED:
${maintenance.systemInstruction}

PROCESO DE RESERVA:
${booking.systemInstruction}
`;

module.exports = { unifiedSystemInstruction };
