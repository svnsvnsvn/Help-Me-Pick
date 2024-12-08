// Define the color palette
// export const miffyColors = [
//   { red: 0.968, green: 0.839, blue: 0.776 }, // Soft Peach
//   { red: 0.925, green: 0.929, blue: 0.941 }, // Light Gray
//   { red: 0.976, green: 0.486, blue: 0.482 }, // Miffy Red
//   { red: 0.549, green: 0.839, blue: 0.776 }, // Soft Mint
//   { red: 0.949, green: 0.788, blue: 0.196 }, // Miffy Yellow
//   { red: 0.835, green: 0.608, blue: 0.608 }, // Dusty Rose
//   { red: 0.486, green: 0.686, blue: 0.776 }, // Sky Blue
// ];


export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getLuminance = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

export const getFontColor = (r, g, b) => {
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5 ? "var(--font-dark)" : "var(--font-light)";
};

export const getRGBFromCSSVariable = (variableName) => {
  const cssVariable = getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();

  // Match both rgba() and rgb() formats
  const rgbaMatch = cssVariable.match(/rgba?\((\d+), (\d+), (\d+)(?:, [\d.]+)?\)/);

  if (rgbaMatch) {
    return {
      red: parseInt(rgbaMatch[1]) / 255, // Normalize to 0–1
      green: parseInt(rgbaMatch[2]) / 255,
      blue: parseInt(rgbaMatch[3]) / 255,
    };
  }

  // Default to black if parsing fails
  return { red: 0, green: 0, blue: 0 };
};

