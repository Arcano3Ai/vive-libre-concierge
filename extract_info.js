const fs = require('fs');
const buffer = fs.readFileSync('./products.json');
let content = buffer.toString('utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}
// Also sometimes ConvertTo-Json adds some weird spacing or non-breaking spaces
content = content.trim();
try {
    const data = JSON.parse(content);
    const products = data.products || data;
    
    let md = '# VIVE LIBRE - Información de Cabañas\n\n';
    
    products.forEach(p => {
        const title = p.title;
        const price = p.variants[0].price;
        const desc = p.body_html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
        const images = p.images.map(img => img.src);
        
        md += `## ${title}\n`;
        md += `- **Precio:** $${price} MXN por noche\n`;
        md += `- **Descripción:** ${desc}\n`;
        md += `- **Galería:**\n`;
        images.forEach(img => {
            md += `  - ${img}\n`;
        });
        md += `\n---\n\n`;
    });
    
    fs.writeFileSync('./VIVE_LIBRE_INFO.md', md);
    console.log('✅ VIVE_LIBRE_INFO.md creado exitosamente.');
    
    // Also generate a JSON helper for the UI
    const cabinsData = products.map(p => ({
        id: p.handle,
        title: p.title,
        price: p.variants[0].price,
        description: p.body_html.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim(),
        images: p.images.map(img => img.src)
    }));
    fs.writeFileSync('./cabins_data.json', JSON.stringify(cabinsData, null, 2));
    
} catch (e) {
    console.error('Error parsing JSON:', e.message);
    // Print first 50 chars to debug
    console.log('First 50 chars:', content.substring(0, 50));
}
