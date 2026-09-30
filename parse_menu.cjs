const xlsx = require('xlsx');
const fs = require('fs');

try {
  const workbook = xlsx.readFile('public/menu/Butterly.Bakery_Full_Product_Catalog (4).xlsx');
  const menuCategories = [];
  
  workbook.SheetNames.forEach((sheet, idx) => {
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
    if (data.length === 0) return;
    
    // Group products by base name
    const groupedProducts = {};
    
    data.forEach((row, i) => {
      const productName = row['Product'] || row['Item Name'] || row['Name'] || `Item_${i}`;
      const baseName = productName.trim();
      
      // Find details column (can be 'Details', 'Details (Box)', 'Details (Cup)')
      let detailsKey = Object.keys(row).find(k => k.startsWith('Details'));
      const details = detailsKey ? row[detailsKey] : '';
      const typeStr = details ? String(details).trim() : '';

      // Initialize group
      if (!groupedProducts[baseName]) {
          groupedProducts[baseName] = {
              id: `c${idx}_p${i}`,
              name: baseName,
              description: 'Delicious freshly baked treat.',
              image: '', 
              variants: []
          };
      }

      // Check for multiple prices
      if (row['Price (₹)/500g'] !== undefined) {
          const p500 = parseFloat(row['Price (₹)/500g']);
          if (!isNaN(p500)) {
              let labelParts = [];
              if (typeStr) labelParts.push(typeStr);
              labelParts.push('500g');
              groupedProducts[baseName].variants.push({
                  label: labelParts.join(' - '),
                  price: p500
              });
          }
      }
      
      if (row['Price (₹)/Kg'] !== undefined) {
          const pkg = parseFloat(row['Price (₹)/Kg']);
          if (!isNaN(pkg)) {
              let labelParts = [];
              if (typeStr) labelParts.push(typeStr);
              labelParts.push('1kg');
              groupedProducts[baseName].variants.push({
                  label: labelParts.join(' - '),
                  price: pkg
              });
          }
      }

      if (row['Price (₹)'] !== undefined) {
          const p = parseFloat(row['Price (₹)']);
          if (!isNaN(p)) {
              let label = typeStr || 'Standard';
              groupedProducts[baseName].variants.push({
                  label: label,
                  price: p
              });
          }
      }
    });
    
    const finalProducts = Object.values(groupedProducts).map(gp => {
        // Sort variants by price so lowest is first
        gp.variants.sort((a, b) => a.price - b.price);
        
        if (gp.variants.length === 0) {
            return null;
        }

        const basePrice = gp.variants[0].price;

        if (gp.variants.length === 1 && (gp.variants[0].label === 'Standard' || gp.variants[0].label === '1')) {
            // No meaningful options
            return {
                id: gp.id,
                name: gp.name,
                description: gp.description,
                price: basePrice,
                image: gp.image
            };
        }
        
        // Has options
        const options = [{
            name: 'Options',
            choices: gp.variants.map(v => {
                let l = v.label;
                if (l === '1') l = 'Standard';
                return { 
                    label: l, 
                    priceModifier: v.price - basePrice 
                };
            })
        }];
        
        return {
            id: gp.id,
            name: gp.name,
            description: gp.description,
            basePrice: basePrice,
            image: gp.image,
            options: options
        };
    }).filter(Boolean); // remove nulls
    
    if (finalProducts.length > 0) {
        let catName = sheet;
        if (catName === 'Cakes Per Kg') {
            catName = 'Cakes';
        }
        menuCategories.push({
            categoryName: catName,
            products: finalProducts
        });
    }
  });
  
  const jsContent = `export const menuCategories = ${JSON.stringify(menuCategories, null, 2)};\n`;
  fs.writeFileSync('src/menuData.js', jsContent);
  console.log('Successfully wrote src/menuData.js');

} catch(e) {
  console.error('Error:', e.message);
}
