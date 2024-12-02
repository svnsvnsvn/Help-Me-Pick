// Define the color palette
export const miffyColors = [
  { red: 0.968, green: 0.839, blue: 0.776 }, // Soft Peach
  { red: 0.925, green: 0.929, blue: 0.941 }, // Light Gray
  { red: 0.976, green: 0.486, blue: 0.482 }, // Miffy Red
  { red: 0.549, green: 0.839, blue: 0.776 }, // Soft Mint
  { red: 0.949, green: 0.788, blue: 0.196 }, // Miffy Yellow
  { red: 0.835, green: 0.608, blue: 0.608 }, // Dusty Rose
  { red: 0.486, green: 0.686, blue: 0.776 }, // Sky Blue
];


export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
