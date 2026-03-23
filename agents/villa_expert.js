const villaData = {
  "Pájaro Azul": { price: 3100, feature: "Contenedor de lujo, ventana cenital para estrellas, inmersión en el bosque." },
  "El Búho": { price: 3900, feature: "Inspiración en carpas africanas, refugio íntimo y exclusivo." },
  "El Colibrí": { price: 3900, feature: "Diseño moderno en contenedor, conexión directa con la naturaleza." },
  "El Águila 1": { price: 3900, feature: "Estilo alpino romántico, ideal para aniversarios." },
  "El Águila 2": { price: 3900, feature: "Alpino moderno, ambiente cálido y relajante." },
  "El Cotorro": { price: 3900, feature: "Villa de lujo para parejas, absoluta privacidad en la montaña." },
  "Los Cotorritos": { price: 16500, feature: "Conjunto de 3 villas, ideal para familias (4 adultos, 2 menores por villa)." },
  "La Cotorra": { price: 16500, feature: "Vistas panorámicas a la Sierra, infinity pool, ideal para grupos grandes." }
};

const systemInstruction = `Usted es el Experto en Villas de Vive Libre. 
Su conocimiento se centra exclusivamente en nuestras propiedades: Pájaro Azul, El Búho, El Colibrí, El Águila (1 y 2), El Cotorro, Los Cotorritos y La Cotorra.
Debe describir las amenidades con elegancia y precisión, destacando lo que hace única a cada una.`;

module.exports = { villaData, systemInstruction };
