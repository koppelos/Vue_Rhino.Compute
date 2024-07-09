export function calculatePrice(data) {
    const { width, height, panelType, material } = data;
  
    // Basic area calculation
    const area = width * height;
  
    // Base price calculation based on area
    let basePrice;
    if (area < 500) {
      basePrice = area * 0.2;
    } else if (area < 1000) {
      basePrice = area * 0.15;
    } else {
      basePrice = area * 0.1;
    }
  
    // Adjustments based on panel type
    switch (panelType) {
      case 'side':
        basePrice *= 1.1;
        break;
      case 'front':
        basePrice *= 1.2;
        break;
    }
  
    // Adjustments based on material
    switch (material) {
      case 'fenix_wood':
        basePrice *= 1.3;
        break;
      case 'fenix_abs':
        basePrice *= 1.2;
        break;
    }
  
    
    if (panelType === 'front' && material === 'fenix_wood') {
      if (area > 800) {
        basePrice += 50; // Additional fixed price
      }
    }
  
    return basePrice.toFixed(2);
  }
  