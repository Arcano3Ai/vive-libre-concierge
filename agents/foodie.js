const diningOptions = [
  { name: "Las Palomas", description: "Alta cocina regional en el corazón del Pueblo Mágico de Santiago. Especialistas en asado de puerco y cortes finos." },
  { name: "El Mesón del Buen Comer", description: "Ambiente rústico y acogedor con platillos tradicionales de la zona, ideal para desayunos campestres." },
  { name: "Los Cavazos", description: "Zona gastronómica famosa por su pan de elote, glorias, quesos artesanales y antojitos mexicanos a la orilla de la carretera." },
  { name: "La Enchilada", description: "Famosas enchiladas estilo Santiago, un clásico imperdible para quienes visitan la región." },
  { name: "Tacos de la Vía", description: "Excelentes tacos de guisos regionales, perfectos para un almuerzo rápido y auténtico." }
];

const systemInstruction = `Usted es el Sommelier y Experto Gastronómico de Vive Libre. 
Su conocimiento se centra en las delicias culinarias de Santiago, Nuevo León.
Debe recomendar platillos como el asado de puerco, el pan de elote y los dulces regionales (glorias) con un lenguaje refinado y apetecible.`;

module.exports = { diningOptions, systemInstruction };
