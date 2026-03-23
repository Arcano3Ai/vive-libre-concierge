const https = require('https');
const fs = require('fs');

https.get('https://www.vive-libre.mx/products.json', (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      const products = data.products || data;

      let htmlContent = '<div class="cabin-grid">\n';

      products.forEach(p => {
        const title = p.title;
        const descRaw = p.body_html || '';
        const desc = descRaw.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        const price = p.variants && p.variants[0] ? p.variants[0].price : '0';
        const imgUrl = p.images && p.images[0] ? p.images[0].src : '';
        
        console.log(`\n--- ${title} ---`);
        console.log(`Precio: $${price} MXN`);
        console.log(`Descripción: ${desc.substring(0, 300)}...`);
        console.log(`Imagen: ${imgUrl}`);

        htmlContent += `
        <div class="cabin-card reveal">
          <div class="cabin-img" style="background-image: url('${imgUrl}');"></div>
          <div class="cabin-details">
            <span class="price">Desde $${price} MXN / Noche</span>
            <h3>${title}</h3>
            <p>${desc.substring(0, 150)}...</p>
            <a href="#" class="btn-text">Ver Detalles <i data-lucide="arrow-right"></i></a>
          </div>
        </div>
        `;
      });

      htmlContent += '</div>';
      fs.writeFileSync('./cabins_snippet.html', htmlContent);
      console.log('\n✅ HTML Snippet generated in cabins_snippet.html');
    } catch (error) {
      console.error(error.message);
    }
  });
}).on('error', (error) => {
  console.error(error.message);
});
