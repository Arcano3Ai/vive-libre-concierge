function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Reservas");
  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Reservas");
    sheet.appendRow(["Fecha de Solicitud", "Nombre/Email", "Fechas", "Huéspedes", "Mensaje", "Tipo"]);
  }
  
  var data = JSON.parse(e.postData.contents);
  var timestamp = new Date();
  
  // Guardar en Google Sheets
  sheet.appendRow([
    timestamp,
    data.name || data.email,
    data.dateRange || "N/A",
    data.guests || "N/A",
    data.message || "",
    data.type || "Reserva"
  ]);
  
  // Crear evento en Google Calendar si es una reserva
  if (data.type === "Reserva" && data.dateRange) {
    try {
      var calendar = CalendarApp.getDefaultCalendar();
      var dates = data.dateRange.split(" a "); // Ajustar según formato de flatpickr
      if (dates.length === 2) {
        var start = new Date(dates[0]);
        var end = new Date(dates[1]);
        calendar.createEvent(
          "RESERVA: " + (data.name || "Cliente Web") + " (" + data.guests + " pers)",
          start,
          end,
          {description: "Reserva realizada desde la web. Huéspedes: " + data.guests}
        );
      }
    } catch (err) {
      console.log("Error creando evento: " + err);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}
